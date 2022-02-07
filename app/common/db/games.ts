import { Op } from "sequelize";
import { Player, Game } from "../../server/models/index";
import { Game as ResultGame, Player as ResultPlayer } from "../types";
import { intToHex } from "../utils/colorConvert";
import { logWithBase } from "../utils/helperFunctions";

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

	const [res, updatedWinner, updatedLoser] = await Promise.all([
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

	return res;
};

const getLatestGames = async (page: number = 0, pageSize: number = 20) => {
	const dbRes = await Game.findAndCountAll({
		order: [["createdAt", "DESC"]],
		limit: pageSize,
		offset: page * pageSize,
		include: [
			{ model: Player, as: "winner" },
			{ model: Player, as: "loser" },
		],
	});
	const res: ResultGame[] = dbRes.rows.map((row): ResultGame => {
		const { id, createdAt, winnerElo, loserElo, underTable, winner, loser } =
			row;
		const getPlayerType = (player?: Player): ResultPlayer => {
			if (!player) throw new Error("Query failed");
			const { id: playerId, elo, firstName, lastName, favoriteColor } = player;
			return {
				id: playerId,
				elo,
				firstName,
				lastName,
				nickname: "",
				favoriteColor: intToHex(favoriteColor),
			};
		};
		return {
			id,
			datetime: createdAt,
			winnerElo,
			loserElo,
			underTable,
			winner: getPlayerType(row.winner),
			loser: getPlayerType(row.loser),
		};
	});
	return res;
};

export { addGame, getLatestGames };
