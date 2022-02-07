import { getLatestGames } from "../../common/db/games";
import {
	createSearchIndexForAll,
	getPlayerMetasByString,
	playerAPI,
} from "../../common/db/players";

const fn2 = async () => {
	const games = await getLatestGames();
	games.forEach((el) => {
		console.log(el);
	});
};

const fn = async () => {
	console.log(await playerAPI.getPlayerStatsById(26));
};

fn();
