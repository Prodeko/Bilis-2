type Player = {
  id: number
  firstName: string
  lastName: string
  nickname: string
  emoji: string
  elo: number
}

type PlayerExtended = Player & {
  position: number
  fullName: string
}

type PlayerWithStatistics = Player & {
  wonGames: number
  totalGames: number
  winPercentage: string
}

type HomeLeaderboard = PlayerExtended[]

type NewPlayer = Omit<Player, 'id'>

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

type NewGame = Omit<Game, 'id'>

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
  PlayerWithStatistics,
}
