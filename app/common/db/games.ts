import { Op } from "sequelize";
import { Player, Game } from "../../server/models/index";
import { redisConnection } from "../../server/utils/redisConf";
import { GameListItem } from "../types";
import { logWithBase } from "../utils/helperFunctions";
import redisKeys from "../utils/redisKeys";

const DEFAULT_LATEST_GAMES = 20;

const addGame = async (
	winnerId: number,
	loserId: number,
	underTable: boolean
) => {
	const [winner, loser, winnerGames, loserGames] = await Promise.all([
		Player.findByPk(winnerId),
		Player.findByPk(loserId),
		Game.count({
			where: {
				[Op.or]: [
					{
						winnerId: winnerId,
					},
					{
						loserId: winnerId,
					},
				],
			},
		}),
		Game.count({
			where: {
				[Op.or]: [
					{
						winnerId: loserId,
					},
					{
						loserId: loserId,
					},
				],
			},
		}),
	]);

	if (!winner || !loser) throw new Error("Query failed");

	const winnerRobust =
		winnerGames + 1 > 20 ? logWithBase(winnerGames + 1, 1.14163) - 2.61648 : 20;
	const loserRobust =
		loserGames + 1 > 20 ? logWithBase(loserGames + 1, 1.14163) - 2.61648 : 20;

	const winnerChange =
		630 *
		(1 - 1 / (1 + Math.pow(2, (loser.elo - winner.elo) / 100))) *
		((loserRobust - 1) / (winnerRobust * loserRobust));

	const loserChange =
		630 *
		(0 - 1 / (1 + Math.pow(2, (winner.elo - loser.elo) / 100))) *
		((winnerRobust - 1) / (loserRobust * winnerRobust));

	const [res, _updatedWinner, _updatedLoser] = await Promise.all([
		Game.create({
			winnerId: winner.id,
			loserId: loser.id,
			winnerElo: winner.elo + winnerChange,
			loserElo: loser.elo + loserChange,
			underTable,
		}),
		Player.update(
			{ elo: winner.elo + winnerChange },
			{ where: { id: winner.id } }
		),
		Player.update(
			{ elo: loser.elo + loserChange },
			{ where: { id: loser.id } }
		),
	]);

	await redisConnection(async (client) => {
		const item: GameListItem = {
			id: res.id,
			winnerElo: res.winnerElo,
			loserElo: res.loserElo,
			underTable: res.underTable,
			datetime: res.createdAt,
			winnerEloBefore: winner.elo,
			loserEloBefore: loser.elo,
			winner: winner.getPlayerWithoutElo(),
			loser: loser.getPlayerWithoutElo(),
		};
		await client.lPush(redisKeys.latestGames, JSON.stringify(item));
		await client.lTrim(redisKeys.latestGames, 0, DEFAULT_LATEST_GAMES - 1);
		await client.hSet(
			`${redisKeys.playerSearch}:${loser.id}`,
			"updatedAt",
			Date.now()
		);
		await client.hSet(
			`${redisKeys.playerSearch}:${winner.id}`,
			"updatedAt",
			Date.now() + 1
		);
	});

	return res;
};

const getLatestGames = async (
	page: number = 0,
	pageSize: number = DEFAULT_LATEST_GAMES
): Promise<GameListItem[]> => {
	if (page === 0 && pageSize === DEFAULT_LATEST_GAMES) {
		const redisRes = await redisConnection(async (client) => {
			if (await client.exists(redisKeys.latestGames)) {
				return (
					await client.lRange(
						redisKeys.latestGames,
						0,
						DEFAULT_LATEST_GAMES - 1
					)
				).map((r: string): GameListItem => JSON.parse(r));
			} else {
				return false;
			}
		});
		if (redisRes) {
			return redisRes;
		}
	}

	const dbRes = await Game.findAndCountAll({
		order: [["createdAt", "DESC"]],
		limit: pageSize,
		offset: page * pageSize,
		include: [
			{ model: Player, as: "winner" },
			{ model: Player, as: "loser" },
		],
	});
	const res: GameListItem[] = await Promise.all(
		dbRes.rows.map(async (row): Promise<GameListItem> => {
			const { id, createdAt, winnerElo, loserElo, underTable, winner, loser } =
				row;

			if (!winner || !loser) throw new Error("Query failed");

			const [winnerEloBefore, loserEloBefore] = await Promise.all([
				Game.findOne({
					order: [["createdAt", "DESC"]],
					where: {
						winnerId: winner?.id,
						createdAt: {
							[Op.lt]: createdAt,
						},
					},
				}).then((g) => {
					if (!g) return 400;
					return g.winnerElo;
				}),
				Game.findOne({
					order: [["createdAt", "DESC"]],
					where: {
						loserId: loser?.id,
						createdAt: {
							[Op.lt]: createdAt,
						},
					},
				}).then((g) => {
					if (!g) return 400;
					return g.loserElo;
				}),
			]);

			return {
				id,
				datetime: createdAt,
				winnerElo,
				loserElo,
				underTable,
				winner: winner.getPlayerType(),
				loser: loser.getPlayerType(),
				winnerEloBefore,
				loserEloBefore,
			};
		})
	);

	if (page === 0 && pageSize >= DEFAULT_LATEST_GAMES) {
		redisConnection(async (client) => {
			await client.del(redisKeys.latestGames);
			await client.rPush(
				redisKeys.latestGames,
				res.slice(0, DEFAULT_LATEST_GAMES).map((r) => JSON.stringify(r))
			);
		});
	}

	return res;
};

const devClearGames = async () =>
	Promise.all([
		Game.destroy({
			where: {
				id: { [Op.gte]: 0 },
			},
		}),
		Player.update(
			{ elo: 400 },
			{
				where: {
					id: { [Op.gte]: 0 },
				},
			}
		),
		redisConnection(async (client) => client.del(redisKeys.latestGames)),
	]);

export { addGame, getLatestGames, devClearGames };
