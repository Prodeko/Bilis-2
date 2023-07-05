import { z } from 'zod'

const id = z.number().int().nonnegative()
const elo = z.number().positive()

// Base types}
const withId = z.object({
  id,
})
type WithId = z.infer<typeof withId>

// Player types
const player = withId.extend({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  nickname: z.string().nonempty(),
  emoji: z.string().emoji().nonempty(),
  motto: z.string().nonempty(),
  elo,
  seasonElo: elo.optional().nullable(),
  latestSeasonId: id.optional().nullable(),
})
type Player = z.infer<typeof player>

const newPlayer = player.omit({ id: true, elo: true })
type NewPlayer = z.infer<typeof newPlayer>

const winLossStats = z.object({
  wonGames: z.number().int().nonnegative(),
  lostGames: z.number().int().nonnegative(),
  totalGames: z.number().int().nonnegative(),
  winPercentage: z.number().nonnegative(),
})
type WinLossStats = z.infer<typeof winLossStats>

const playerStats = winLossStats.extend({
  longestWinStreak: z.number().int().nonnegative(),
})
type PlayerStats = z.infer<typeof playerStats>

const playerWithStats = player.merge(playerStats)
type PlayerWithStats = z.infer<typeof playerWithStats>

const hofPlayer = player.extend({
  hofStat: z.union([z.string(), z.number()]),
})
type HofPlayer = z.infer<typeof hofPlayer>

// Game types
const game = withId.extend({
  winnerId: id,
  loserId: id,
  winnerEloBefore: elo,
  loserEloBefore: elo,
  winnerEloAfter: elo,
  loserEloAfter: elo,
  winnerSeasonalEloBefore: elo.nullable().optional(),
  loserSeasonalEloBefore: elo.nullable().optional(),
  winnerSeasonalEloAfter: elo.nullable().optional(),
  loserSeasonalEloAfter: elo.nullable().optional(),
  underTable: z.boolean(),
  seasonId: id.optional(),
})
type Game = z.infer<typeof game>

const recentGame = game.extend({
  formattedTimeString: z.string().datetime(),
  winner: z.string(),
  loser: z.string(),
})
type RecentGame = z.infer<typeof recentGame>

const mutualGames = z.object({
  currentPlayerGamesWon: z.number().int().nonnegative(),
  opposingPlayerGamesWon: z.number().int().nonnegative(),
  totalGames: z.number().int().nonnegative(),
})
type MutualGames = z.infer<typeof mutualGames>

const gameWithPlayers = game.extend({
  winner: player,
  loser: player,
})
type GameWithPlayers = z.infer<typeof gameWithPlayers>

const newGame = game.omit({ id: true })
type NewGame = z.infer<typeof newGame>

const createGameType = z.object({
  winnerId: id,
  loserId: id,
  underTable: z.boolean().optional(),
})
type CreateGameType = z.infer<typeof createGameType>

const timeSeriesGame = z.object({
  currentElo: elo,
  currentSeasonalElo: elo.nullable().optional(),
  opponent: z.string().optional(),
  seasonalEloDiff: z.number().nullable().optional(),
  eloDiff: z.number(),
})
type TimeSeriesGame = z.infer<typeof timeSeriesGame>

// Season types
const baseSeason = withId.extend({
  start: z.date(),
  end: z.date(),
  name: z.string().optional(),
})

// Method 'omit' does not exist for the return type of
// refine method, so the baseSeason is needed
const season = baseSeason.refine(season => {
  season.start < season.end
}, 'End date must be grater than start date!')
type Season = z.infer<typeof season>

const newSeason = baseSeason.omit({ id: true })
type NewSeason = z.infer<typeof newSeason>

// Profile types

const subStatistic = z.object({
  label: z.string(),
  value: z.string(),
})
type SubStatistic = z.infer<typeof subStatistic>

const profileStatistic = z.object({
  label: z.string(),
  subStatistics: z.array(subStatistic),
})
type ProfileStatistic = z.infer<typeof profileStatistic>

const pieChartProps = z.object({
  currentPlayer: player,
  opposingPlayer: player,
  mutualGames,
})
type PieChartProps = z.infer<typeof pieChartProps>

// Random types

/**
 * Add these to the smooth scroll functions and to the list items you want to smooth scroll into
 */
enum SmoothScrollId {
  Queue = 'queue-list-item',
  Addgame = 'add-game-list-item',
}

// Export types
export type {
  WithId,
  Player,
  NewPlayer,
  Game,
  GameWithPlayers,
  NewGame,
  RecentGame,
  SubStatistic,
  ProfileStatistic,
  WinLossStats,
  PlayerStats,
  MutualGames,
  PlayerWithStats,
  TimeSeriesGame,
  Season,
  NewSeason,
  CreateGameType,
  PieChartProps,
  HofPlayer,
}

export {
  id,
  elo,
  withId,
  player,
  newPlayer,
  winLossStats,
  playerStats,
  playerWithStats,
  game,
  recentGame,
  mutualGames,
  gameWithPlayers,
  newGame,
  createGameType,
  timeSeriesGame,
  subStatistic,
  season,
  newSeason,
  profileStatistic,
  pieChartProps,
  hofPlayer,
}

export { SmoothScrollId }
