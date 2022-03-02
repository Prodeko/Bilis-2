import { Game, Player } from "../../../server/models";
import { Op, WhereOptions } from "sequelize";
import { getScoreChange } from "../../utils/gameStats";
import { GameListItem } from "../../types";
import { DEFAULT_ELO } from "../../utils/constants";

const getGamePlayersData = async (
    winnerId: number,
    loserId: number
) : Promise<[Player, Player, number, number]> => {
    const [winner, loser, winnerGames, loserGames] = await Promise.all([
        Player.findByPk(winnerId),
		Player.findByPk(loserId),
		Game.count({
			where: {
				[Op.or]: [
					{winnerId},
					{loserId: winnerId},
				],
			},
		}),
		Game.count({
			where: {
				[Op.or]: [
					{winnerId: loserId},
					{loserId},
				],
			},
		}),
	]);
    if (!winner || !loser) throw new Error("Query failed");
    return [winner, loser, winnerGames, loserGames];
}

const createGame = async (
    winnerId: number, 
    loserId: number, 
    underTable: boolean
): Promise<[Game, Player, Player]> => {
    const [winner, loser, winnerGames, loserGames] = await getGamePlayersData(winnerId, loserId);
    const [winnerChange, loserChange] = getScoreChange(
        winner.elo,
        winnerGames,
        loser.elo,
        loserGames
    );
    const [game, ..._] = await Promise.all([
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
    return [game, winner, loser];
}

const getDbGames = async (page: number, pageSize: number) => {
    const res = await Game.findAndCountAll({
		order: [["createdAt", "DESC"]],
		limit: pageSize,
		offset: page * pageSize,
		include: [
			{ model: Player, as: "winner" },
			{ model: Player, as: "loser" },
		],
	});
    return res;
}

const getMutualGames = async (
	id1: number,
	id2: number,
	page: number = 0,
	pageSize: number = 25
) => {
	const res = await Game.findAndCountAll({
		order: [["createdAt", "DESC"]],
		limit: pageSize,
		offset: page * pageSize,
		where: {
			[Op.or]: [
				{
					winnerId: id1,
					loserId: id2
				},
				{
					winnerId: id2,
					loserId: id1
				}
			]
		}
	});
    return res;
}

const findPrevElo = async (
	playerId: number,
	createdAt: Date,
	side: "winner" | "loser"
): Promise<number> => {
	const query: WhereOptions<any> = {
		createdAt: {
			[Op.lt]: createdAt,
		}
	}
	if (side === "winner") {
		query.winnerId = playerId;
	} else {
		query.loserId = playerId;
	}
	const latestGame = await Game.findOne({
		order: [["createdAt", "DESC"]],
		where: query
	});
	if (!latestGame) {
		return DEFAULT_ELO;
	} else {
		return side === "winner"
			? latestGame.winnerElo
			: latestGame.loserElo;
	}
}

const getGames = async (page: number, pageSize: number) => {
    const dbGames = await getDbGames(page, pageSize);
	const games: GameListItem[] = await Promise.all(
		dbGames.rows.map(async (row): Promise<GameListItem> => {
			const { id, createdAt, winnerElo, loserElo, underTable, winner, loser } = row;
			if (!winner || !loser) throw new Error("Query failed");
			const [winnerEloBefore, loserEloBefore] = await Promise.all([
				findPrevElo(winner.id, createdAt, "winner"),
				findPrevElo(loser.id, createdAt, "loser")
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
    return games;
}

export {
    createGame,
    getGames,
	getMutualGames
}