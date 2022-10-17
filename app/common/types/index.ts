// Player types
type Player = {
  id: number
  firstName: string
  lastName: string
  nickname: string
  emoji: string
  motto: string
  elo: number
}

type NewPlayer = Omit<Player, 'id'>

type PlayerExtended = Player & {
  position: number
  fullName: string
}

type PlayerStats = {
  wonGames: number
  lostGames: number
  totalGames: number
  winPercentage: number
  eloData: number[]
}

type HomeLeaderboard = PlayerExtended[]

// Game types
type Game = {
  id: number
  winnerId: number
  loserId: number
  winnerEloBefore: number
  loserEloBefore: number
  winnerEloAfter: number
  loserEloAfter: number
  underTable: boolean
  createdAt: Date
}

type NewGame = Omit<Game, 'id'>

type RecentGame = {
  id: number
  time: string
  winner: string
  winnerEloChange: string
  loser: string
  loserEloChange: string
}

type GameWithPlayers = Game & {
  winner: Player
  loser: Player
}

// Profile types
interface ProfileStatistic {
  label: string
  value: string
}

export type {
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
}
