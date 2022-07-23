import { NextApiRequest } from 'next/types'

type ValidationError = {
  field: string
  message: string
}

type Player = {
  id: number
  firstName: string
  lastName: string
  nickname: string
  emoji: string
  favoriteColor: string
  elo: number
}

type NewPlayer = Omit<Player, 'id'>

type PlayerWithStats = Player & {
  wonGames: number
  lostGames: number
  maxElo: number
  minElo: number
}

type Game = {
  id: number
  datetime: Date
  underTable: boolean
  winnerElo: number
  loserElo: number
  winner: Player
  loser: Player
}

type GameListItem = Game & {
  winner: Player
  loser: Player
  winnerEloBefore: number
  loserEloBefore: number
}

type MutualStatsPlayer = {
  mutualGamesWon: number
  name: string
  favoriteColor: string
}

interface RequestWithPage extends NextApiRequest {
  page?: number
  pageSize?: number
}

export type {
  Player,
  Game,
  ValidationError,
  PlayerWithStats,
  NewPlayer,
  GameListItem,
  RequestWithPage,
  MutualStatsPlayer,
}
