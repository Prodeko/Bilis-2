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
  elo: number
}

type PlayerExtended = Player & {
  position: number
  fullName: string
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

type NewGame = Omit<Game, 'id'>

interface RequestWithPage extends NextApiRequest {
  page?: number
  pageSize?: number
}

type Styles = {
  readonly [key: string]: string
}

export type {
  Player,
  PlayerExtended,
  ValidationError,
  NewPlayer,
  Game,
  NewGame,
  RequestWithPage,
  HomeLeaderboard,
  Styles,
}
