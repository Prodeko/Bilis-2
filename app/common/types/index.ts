import { NextApiRequest } from 'next/types'

type ValidationError = {
  field: string
  message: string
}

type PlayerMeta = {
  id: number
  firstName: string
  lastName: string
  nickname: string
  emoji: string
}

type PlayerWithoutElo = PlayerMeta & {
  favoriteColor: string
}

type NewPlayer = Omit<PlayerWithoutElo, 'id'>

type Player = PlayerWithoutElo & {
  elo: number
}

type PlayerWithStats = Player & {
  wonGames: number
  lostGames: number
  maxElo: number
  minElo: number
}

type GameMeta = {
  id: number
  datetime: Date
  underTable: boolean
  winnerElo: number
  loserElo: number
}

type Game = GameMeta & {
  winner: Player
  loser: Player
}

type GameListItem = GameMeta & {
  winner: PlayerWithoutElo
  loser: PlayerWithoutElo
  winnerEloBefore: number
  loserEloBefore: number
}

type MutualStatsPlayer = {
  mutualGamesWon: number
  name: string,
  favoriteColor: string
}

interface RequestWithPage extends NextApiRequest {
  page?: number
  pageSize?: number
}

interface QueueInfo extends PlayerWithoutElo {
  time: Date
}

export type {
  Player,
  Game,
  ValidationError,
  PlayerMeta,
  PlayerWithStats,
  PlayerWithoutElo,
  NewPlayer,
  QueueInfo,
  GameListItem,
  RequestWithPage,
  MutualStatsPlayer,
}
