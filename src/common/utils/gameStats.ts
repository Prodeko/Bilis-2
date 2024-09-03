import { elo } from "@common/types";

import { formatFullName, formatIsoStringToDate } from "./helperFunctions";

/**
 * Helper function used to calculate robustGameScore for fargo ratings
 * @param x - Nonimator input for natural logarithm
 * @param base - Denonimator input for natural logarithm
 * @returns Floating point number
 */
export const logWithBase = (x: number, base: number): number =>
  Math.log(x) / Math.log(base);

const robustGameScore = (gameCount: number) => {
  return gameCount + 1 > 20
    ? logWithBase(gameCount + 1, 1.14163) - 2.61648
    : 20;
};

const getScoreChange = (
  winnerElo: number,
  winnerGames: number,
  loserElo: number,
  loserGames: number,
) => {
  const winnerRobust = robustGameScore(winnerGames);
  const loserRobust = robustGameScore(loserGames);
  const winnerChange =
    630 *
    (1 - 1 / (1 + 2 ** ((loserElo - winnerElo) / 100))) *
    ((loserRobust - 1) / (winnerRobust * loserRobust));

  const loserChange =
    630 *
    (0 - 1 / (1 + 2 ** ((winnerElo - loserElo) / 100))) *
    ((winnerRobust - 1) / (loserRobust * winnerRobust));
  return [winnerChange, loserChange];
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const mapLatestGameToFrontend = (game: any) => ({
  time: formatIsoStringToDate(game.createdAt),
  winner: game.winner
    ? formatFullName(game.winner, true, !!game.winner.nickname)
    : "Winner name not found",
  loser: game.loser
    ? formatFullName(game.loser, true, !!game.loser.nickname)
    : "Loser name not found",
  winnerFargoNow: elo.parse(Number(game.winnerEloAfter.toFixed(2))),
  winnerFargoDifference: game.winnerEloAfter - game.winnerEloBefore,
  loserFargoNow: elo.parse(Number(game.loserEloAfter.toFixed(2))),
  loserFargoDifference: game.loserEloAfter - game.loserEloBefore,
  underTable: game.underTable ? "💩" : " ",
});

export { robustGameScore, getScoreChange, mapLatestGameToFrontend };
