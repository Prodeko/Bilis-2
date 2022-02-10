import { Op } from "sequelize";
import { Player, Game } from "../../server/models/index";
import { redisConnection } from "../../server/utils/redisConf";
import { GameListItem } from "../types";
import { DEFAULT_LATEST_GAMES } from "../utils/constants";
import redisKeys from "../utils/redisKeys";
import { getLatestGamesFromCache, addGameToCache, initGameCache } from "./services/gameCache";
import { createGame, getGames } from "./services/gameService";

const addGame = async (
	winnerId: number,
	loserId: number,
	underTable: boolean
) => {
	const [game, winner, loser] = await createGame(winnerId, loserId, underTable);
	await addGameToCache(game, winner, loser);
	return game;
};

const getLatestGames = async (
	page: number = 0,
	pageSize: number = DEFAULT_LATEST_GAMES
): Promise<GameListItem[]> => {
	const cacheGames = await getLatestGamesFromCache();
	if (cacheGames) return cacheGames;
	const games = await getGames(page, pageSize);
	if (page === 0 && pageSize >= DEFAULT_LATEST_GAMES) {
		initGameCache(games);
	}

	return games;
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
