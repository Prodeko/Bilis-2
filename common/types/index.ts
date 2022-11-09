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

interface PlayerExtended extends Player {
  position: number
  fullName: string
}

interface PlayerStats {
  wonGames: number
  lostGames: number
  totalGames: number
  winPercentage: number
  eloData: number[]
}

type PlayerWithStats = Player & PlayerStats

type HomeLeaderboard = PlayerExtended[]

// Game types
interface Game extends WithId {
  winnerId: number
  loserId: number
  winnerEloBefore: number
  loserEloBefore: number
  winnerEloAfter: number
  loserEloAfter: number
  underTable: boolean
  createdAt: Date
}

type RecentGame = {
  id: number
  time: string
  winner: string
  winnerEloChange: string
  loser: string
  loserEloChange: string
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

// Profile types
interface ProfileStatistic {
  label: string
  value: string
}

// Miscellaneous types
type CSSStyles = {
  readonly [key: string]: string
}

// Export types
export type {
  WithId,
  CSSStyles,
  Player,
  PlayerExtended,
  NewPlayer,
  Game,
  GameWithPlayers,
  NewGame,
  RecentGame,
  HomeLeaderboard,
  ProfileStatistic,
  PlayerStats,
  MutualGames,
  PlayerWithStats,
}