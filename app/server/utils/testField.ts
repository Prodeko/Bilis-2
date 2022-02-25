import { getLatestGames } from "../../common/db/games";
import {
	createSearchIndexForAll,
	getPlayerMetasByString,
	playerAPI,
} from "../../common/db/players";

const fn2 = async () => {
	const games = await getLatestGames();
	games.forEach((el) => {
		console.log(
			`${el.id}: Winner: ${el.winner.id} - ${el.winnerEloBefore} -> ${el.winnerElo} --- Loser: ${el.loser.id} - ${el.loserEloBefore} -> ${el.loserElo}`
		);
	});
	const leaderboard = await playerAPI.getTopPlayers();
	leaderboard.forEach((el, i) =>
		console.log(
			`${i + 1} ${el.firstName} ${el.lastName} (${el.id}) --- ${el.elo}`
		)
	);
};

const fn = async () => {
	console.log(await playerAPI.getPlayerStatsById(26));
};

fn2();