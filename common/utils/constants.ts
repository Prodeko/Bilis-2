import type { TimeSeriesGame } from '@common/types'

const ADD_GAME_LIST_ID = 'add-game-list'
const DEFAULT_LATEST_GAMES = 20
const DEFAULT_ELO = 400
const DEFAULT_LEADERBOARD_SIZE = 20
const ZEROTH_GAME: TimeSeriesGame = {
  currentElo: DEFAULT_ELO, // Everybody starts from 400 elo
  opponent: '',
  eloDiff: 0,
}

export {
  ADD_GAME_LIST_ID,
  DEFAULT_LATEST_GAMES,
  DEFAULT_ELO,
  DEFAULT_LEADERBOARD_SIZE,
  ZEROTH_GAME,
}
