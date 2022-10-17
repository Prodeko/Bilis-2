import type { NextApiRequest, NextApiResponse } from 'next'
import { createGame } from '@server/db/games'
import { Game } from '@common/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Game>) {
  const game = await createGame(req.body)
  res.status(200).json(game.toJSON())
}
