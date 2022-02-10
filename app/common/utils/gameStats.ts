import { logWithBase } from "./helperFunctions";

const robustGameScore = (gameCount: number) => {
    return gameCount + 1 > 20 ? logWithBase(gameCount + 1, 1.14163) - 2.61648 : 20;
}

const getScoreChange = (
    winnerElo: number,
    winnerGames: number,
    loserElo: number,
    loserGames: number
) => {
    const winnerRobust = robustGameScore(winnerGames);
    const loserRobust = robustGameScore(loserGames);
    const winnerChange =
		630 *
		(1 - 1 / (1 + Math.pow(2, (loserElo - winnerElo) / 100))) *
		((loserRobust - 1) / (winnerRobust * loserRobust));

	const loserChange =
		630 *
		(0 - 1 / (1 + Math.pow(2, (winnerElo - loserElo) / 100))) *
		((winnerRobust - 1) / (loserRobust * winnerRobust));
    return [winnerChange, loserChange];
}

export { getScoreChange }