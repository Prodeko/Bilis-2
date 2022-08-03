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

type HomeLeaderboard = Player[]

type NewPlayer = Omit<Player, 'id'>

type Game = {
  id: number
  winnerId: number
  loserId: number
  winnerElo: number
  loserElo: number
  underTable: boolean
}

export type NewGame = Omit<Game, 'id'>

interface RequestWithPage extends NextApiRequest {
  page?: number
  pageSize?: number
}

type Styles = {
  readonly [key: string]: string
}

export type { Player, ValidationError, NewPlayer, RequestWithPage, HomeLeaderboard, Styles }
