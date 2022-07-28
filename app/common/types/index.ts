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

interface RequestWithPage extends NextApiRequest {
  page?: number
  pageSize?: number
}

type Styles = {
  readonly [key: string]: string
}

export type { Player, ValidationError, NewPlayer, RequestWithPage, HomeLeaderboard, Styles }
