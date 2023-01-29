// Base types
interface WithId {
  id: number
}

// Player types
interface Player extends WithId {
  firstName: string
  lastName: string
  nickname: string
  emoji: string
  motto: string
  elo: number
}

type NewPlayer = Omit<Player, 'id'>

interface PlayerStats {
  wonGames: number
  lostGames: number
  totalGames: number
  winPercentage: number
}

type PlayerWithStats = Player & PlayerStats

// Game types
interface Game extends WithId {
  winnerId: number
  loserId: number
  winnerEloBefore: number
  loserEloBefore: number
  winnerEloAfter: number
  loserEloAfter: number
  underTable: boolean
}

interface RecentGame extends Game {
  formattedTimeString: string
  winner: string
  loser: string
}

interface MutualGames {
  currentPlayerGamesWon: number
  opposingPlayerGamesWon: number
  totalGames: number
}

interface GameWithPlayers extends Game {
  winner: Player
  loser: Player
}

type NewGame = Omit<Game, 'id'>

type CreateGameType = Pick<NewGame, 'winnerId' | 'loserId' | 'underTable'>

interface TimeSeriesGame {
  currentElo: number
  opponent: string | null
  eloDiff: number
}

// Profile types
interface ProfileStatistic {
  label: string
  value: string
}

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
  ProfileStatistic,
  PlayerStats,
  MutualGames,
  PlayerWithStats,
  TimeSeriesGame,
  CreateGameType,
}

export { SmoothScrollId }
