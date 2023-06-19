import { z } from "zod"


const id = z.number().int().nonnegative()
const elo = z.number().positive()

// Base types}
const withId = z.object({
  id
})
type WithId = z.infer<typeof withId>

// Player types
const player = withId.extend({
  firstName: z.string(),
  lastName: z.string(),
  nickname: z.string(),
  emoji: z.string().emoji(),
  motto: z.string(),
  elo
})
type Player = z.infer<typeof player>

const newPlayer = player.omit({id: true})
type NewPlayer = z.infer<typeof newPlayer>

const playerStats = z.object({
  wonGames: z.number().int().nonnegative(),
  lostGames: z.number().int().nonnegative(),
  totalGames: z.number().int().nonnegative(),
  winPercentage: z.number().nonnegative(),
})
type PlayerStats = z.infer<typeof playerStats>

const playerWithStats = player.merge(playerStats)
type PlayerWithStats = z.infer<typeof playerWithStats>

// Game types
const game = withId.extend({
  winnerId: id,
  loserId: id,
  winnerEloBefore: elo,
  loserEloBefore: elo,
  winnerEloAfter: elo,
  loserEloAfter: elo,
  underTable: z.boolean()
})
type Game = z.infer<typeof game>


const recentGame = game.extend({
  formattedTimeString: z.string().datetime(),
  winner: z.string(),
  loser: z.string()
})
type RecentGame = z.infer<typeof recentGame>

const mutualGames = z.object({
  currentPlayerGamesWon: z.number().int().nonnegative(),
  opposingPlayerGamesWon: z.number().int().nonnegative(),
  totalGames: z.number().int().nonnegative()
})
type MutualGames = z.infer<typeof mutualGames>


const gameWithPlayers = game.extend({
  winner: player,
  loser: player
})
type GameWithPlayers = z.infer<typeof gameWithPlayers>

const newGame = game.omit({id: true})
type NewGame = z.infer<typeof newGame>

const createGameType = z.object({
  winnerId: id,
  loserId: id,
  underTable: z.boolean().optional()
})
type CreateGameType = z.infer<typeof createGameType>

const timeSeriesGame = z.object({
  currentElo: elo,
  opponent: z.string().optional(),
  eloDiff: z.number()
})
type TimeSeriesGame = z.infer<typeof timeSeriesGame>

// Profile types

const profileStatistic = z.object({
  label: z.string(),
  value: z.string()
})
type ProfileStatistic = z.infer<typeof profileStatistic>

// Random types

/**
 * Add these to the smooth scroll functions and to the list items you want to smooth scroll into
 */
enum SmoothScrollId {
  Queue = 'queue-list-item',
  Addgame = 'add-game-list-item',
}

interface GridPositionColumn {
  gridColumnStart: string
  gridColumnEnd: string
}

interface GridPositionRow {
  gridRowStart: string
  gridRowEnd: string
}

/**
 * Define where in the grid the component is and how many rows/columns it spans
 */
type GridPosition = GridPositionColumn | GridPositionRow

// Export types
export type {
  WithId,
  Player,
  NewPlayer,
  Game,
  GameWithPlayers,
  NewGame,
  RecentGame,
  ProfileStatistic,
  PlayerStats,
  MutualGames,
  PlayerWithStats,
  TimeSeriesGame,
  CreateGameType,
  GridPosition,
  GridPositionColumn,
}

export {
  withId,
  player,
  newPlayer,
  playerStats,
  playerWithStats,
  game,
  recentGame,
  mutualGames,
  gameWithPlayers,
  newGame,
  createGameType,
  timeSeriesGame,
  profileStatistic
}

export { SmoothScrollId }
