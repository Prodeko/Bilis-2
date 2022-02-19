import type {
	Player as ReturnPlayer,
	PlayerMeta,
	PlayerWithStats,
} from "../../common/types";
import { Player } from "../../server/models/index";
import { checkSetupScript } from "../../server/utils/setupScriptHandler";
import { ObjectNotFoundError } from "../exceptions";
import { hexToInt } from "../utils/colorConvert";
import { DEFAULT_LEADERBOARD_SIZE } from "../utils/constants";
import { deletePlayerSearchIndexes, getCachedPlayerMetas, getCachedTopPlayers, setPlayerSearchIndexes, setPlayerToCache, setTopPlayers } from "./services/playerCache";
import { createPlayer, getPlayerMetas, getPlayers, getPlayerStats, getTopPlayersDb } from "./services/playerService";

const addPlayer = async (
	firstName: string,
	lastName: string,
	nickname: string,
	favoriteColor: string,
	elo: number = 400
) => {
	const player = await createPlayer({
		firstName,
		lastName,
		nickname,
		favoriteColor: hexToInt(favoriteColor),
		elo,
	})
	await setPlayerToCache(player);
	return player.getPlayerType();
};

const createSearchIndexForAll = async () => {
	const [players] = await Promise.all([
		getPlayers(),
		deletePlayerSearchIndexes(),
	]);
	await setPlayerSearchIndexes(players);
};

checkSetupScript("createSearchIndexForAll-0.1", createSearchIndexForAll);

const getPlayerMetasByString = async (
	str: string,
	page: number = 0,
	pageSize: number = 20
): Promise<PlayerMeta[]> =>
	getCachedPlayerMetas(str, page, pageSize, getPlayerMetas);

const getPlayerStatsById = async (id: number): Promise<PlayerWithStats> => {
	const stats = await getPlayerStats(id);
	return stats;
};

const getTopPlayers = async (
	page: number = 0,
	pageSize: number = DEFAULT_LEADERBOARD_SIZE
): Promise<ReturnPlayer[]> => {
	if (page === 0 && pageSize === DEFAULT_LEADERBOARD_SIZE) {
		const cachedPlayers = await getCachedTopPlayers();
		if ( cachedPlayers ) {
			return cachedPlayers;
		}
	}

	const players  = await getTopPlayersDb(page, pageSize);

	if (page === 0 && pageSize >= DEFAULT_LEADERBOARD_SIZE) {
		setTopPlayers(players);
	}

	return players;
};

const playerAPI = {
	addPlayer,
	getById: async (id: number): Promise<ReturnPlayer> => {
		const dbPlayer = await Player.findByPk(id);

		if (!dbPlayer) {
			throw new ObjectNotFoundError();
		}

		return dbPlayer.getPlayerType();
	},
	searchByKeywords: (keywords: string): Promise<PlayerMeta[]> =>
		getPlayerMetasByString(keywords),
	getPlayerStatsById,
	getTopPlayers,
};

export {
	playerAPI,
	addPlayer,
	createSearchIndexForAll,
	getPlayerMetasByString,
};
