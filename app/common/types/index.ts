// Player types
type Player = {
  id: number
  firstName: string
  lastName: string
  nickname: string
  emoji: string
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
  eloData: Array<number>
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
}

type NewGame = Omit<Game, 'id'>

type GameWithPlayers = {
  id: number
  winnerId: number
  loserId: number
  winner: Player
  loser: Player
  winnerEloBefore: number
  loserEloBefore: number
  winnerEloAfter: number
  loserEloAfter: number
  underTable: boolean
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
  HomeLeaderboard,
  ProfileStatistic,
  PlayerStats,
}
