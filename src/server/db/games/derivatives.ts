import { Op } from "sequelize";

import type {
  GameWithPlayers,
  MutualGames,
  PlayerStats,
  RecentGame,
  TimeSeriesGame,
} from "@common/types";
import { DEFAULT_ELO, ZEROTH_GAME } from "@common/utils/constants";
import {
  calculateLongestContinuousSequence,
  computeWinLossStats,
  formatFullName,
  formatIsoStringToDate,
} from "@common/utils/helperFunctions";
import { getCurrentSeason } from "@server/db/seasons";
import { GameModel, PlayerModel } from "@server/models";

import { getLatestGames, getPlayerOrderedGames } from ".";

const getPlayerStats = async (playerId: number): Promise<PlayerStats> => {
  const games = await getPlayerOrderedGames(playerId);
  const currentSeason = await getCurrentSeason();

  const wonGames = games.filter((game) => game.winnerId === playerId).length;
  const lostGames = games.filter((game) => game.loserId === playerId).length;
  const longestWinStreak = calculateLongestContinuousSequence(
    games,
    (g) => g.winnerId === playerId,
  );

  const wonSeasonalGames = games
    .filter((game) => game.seasonId === currentSeason?.id)
    .filter((game) => game.winnerId === playerId).length;
  const lostSeasonalGames = games
    .filter((game) => game.seasonId === currentSeason?.id)
    .filter((game) => game.winnerId === playerId).length;

  const seasonStats = computeWinLossStats(wonSeasonalGames, lostSeasonalGames);

  return {
    longestWinStreak,
    ...computeWinLossStats(wonGames, lostGames),
    seasonal: seasonStats,
  };
};

const getGameCountForPlayer = async (playerId: number): Promise<number> =>
  GameModel.count({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
  });

const getSeasonGameCountForPlayer = async (
  playerId: number,
  seasonId: number,
): Promise<number> =>
  GameModel.count({
    where: {
      [Op.and]: [
        { [Op.or]: [{ winnerId: playerId }, { loserId: playerId }] },
        { seasonId },
      ],
    },
  });

const getPlayerDetailedGames = async (
  playerId: number,
): Promise<TimeSeriesGame[]> => {
  const games = await GameModel.findAll({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
    include: [
      {
        model: PlayerModel,
        as: "winner",
      },
      {
        model: PlayerModel,
        as: "loser",
      },
    ],
    order: [["createdAt", "ASC"]],
  });
  const jsonGames = games.map((game) => game.toJSON()) as GameWithPlayers[];

  const createTimeSeriesGame = async (
    game: GameWithPlayers,
  ): Promise<TimeSeriesGame> => {
    const isWinner = game.winnerId === playerId;
    const currentElo = isWinner ? game.winnerEloAfter : game.loserEloAfter;
    const currentSeasonalElo = isWinner
      ? game.winnerSeasonalEloAfter
      : game.loserSeasonalEloAfter;
    const eloDiff = isWinner
      ? game.winnerEloAfter - game.winnerEloBefore
      : game.loserEloAfter - game.loserEloBefore;
    let seasonalEloDiff;
    if (game.seasonId == null) {
      seasonalEloDiff = null;
    } else {
      seasonalEloDiff = isWinner
        ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          game.winnerSeasonalEloAfter! - game.winnerSeasonalEloBefore!
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          game.loserSeasonalEloAfter! - game.loserSeasonalEloBefore!;
    }
    const opponent = isWinner
      ? game.loser.firstName + " " + game.loser.lastName
      : game.winner.firstName + " " + game.winner.lastName;
    return {
      currentElo,
      opponent,
      eloDiff,
      currentSeasonalElo,
      seasonalEloDiff,
    };
  };

  const playedGames = await Promise.all(jsonGames.map(createTimeSeriesGame));
  const gameData = [ZEROTH_GAME, ...playedGames];

  return gameData;
};

const getMutualGamesCount = async (
  currentPlayerId: number,
  opposingPlayerId: number,
): Promise<MutualGames> => {
  const [currentPlayerGamesWon, opposingPlayerGamesWon] = await Promise.all([
    GameModel.count({
      where: {
        winnerId: currentPlayerId,
        loserId: opposingPlayerId,
      },
    }),
    GameModel.count({
      where: {
        winnerId: opposingPlayerId,
        loserId: currentPlayerId,
      },
    }),
  ]);
  const totalGames = currentPlayerGamesWon + opposingPlayerGamesWon;

  return {
    currentPlayerGamesWon,
    opposingPlayerGamesWon,
    totalGames,
  };
};

const getRecentGames = async (
  n = 20,
  seasonal = false,
  offset = 0,
): Promise<RecentGame[]> => {
  const recentGames = await getLatestGames(n, offset, seasonal);

  return recentGames.map((recentGame) =>
    formatRecentGame(recentGame, seasonal),
  );
};

const formatRecentGame = (game: GameModel, seasonal = false): RecentGame => {
  if (!game.winner) {
    throw new Error("Error in formatting recent game: winner missing!");
  } else if (!game.loser) {
    throw new Error("Error in formatting recent game: loser missing!");
  }
  return {
    id: game.id,
    winnerId: game.winnerId,
    loserId: game.loserId,
    winnerEloBefore: seasonal
      ? game.winnerSeasonEloBefore ?? DEFAULT_ELO
      : game.winnerEloBefore,
    winnerEloAfter: seasonal ? game.winnerSeasonEloAfter : game.winnerEloAfter,
    loserEloBefore: seasonal
      ? game.loserSeasonEloBefore ?? DEFAULT_ELO
      : game.loserEloBefore,
    loserEloAfter: seasonal ? game.loserSeasonEloAfter : game.loserEloAfter,
    underTable: game.underTable,
    formattedTimeString: formatIsoStringToDate(game.createdAt.toISOString()),
    winner: `${formatFullName(game.winner, true, Boolean(game.winner.nickname))}`,
    loser: `${formatFullName(game.loser, true, Boolean(game.loser.nickname))}`,
  };
};

// NOTE!! Only use in dev, destroys everything in database
const clearGamesDEV = (): Promise<number> =>
  GameModel.destroy({
    where: {},
    truncate: true,
    cascade: true,
  });

export {
  getPlayerStats,
  getGameCountForPlayer,
  getSeasonGameCountForPlayer,
  getPlayerDetailedGames,
  getMutualGamesCount,
  getRecentGames,
  formatRecentGame,
  clearGamesDEV,
};
