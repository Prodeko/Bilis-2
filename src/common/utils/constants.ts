import type { TimeSeriesGame } from "@common/types";

const DEFAULT_LATEST_GAMES = 20;
const DEFAULT_ELO = 400;
const DEFAULT_LEADERBOARD_SIZE = 20;
const NOF_LEADERBOARD_PLAYERS = 50;
const NOF_LATEST_PLAYERS = 20;
const ZEROTH_GAME: TimeSeriesGame = {
  currentElo: DEFAULT_ELO, // Everybody starts from 400 elo
  opponent: "",
  eloDiff: 0,
};

export {
  DEFAULT_LATEST_GAMES,
  DEFAULT_ELO,
  DEFAULT_LEADERBOARD_SIZE,
  NOF_LATEST_PLAYERS,
  NOF_LEADERBOARD_PLAYERS,
  ZEROTH_GAME,
};
