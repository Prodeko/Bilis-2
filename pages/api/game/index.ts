import type { NextApiRequest, NextApiResponse } from 'next'

import { RecentGame } from '@common/types'
import { createGame, formatRecentGame } from '@server/db/games'

export default async function handler(req: NextApiRequest, res: NextApiResponse<RecentGame>) {
  const game = await createGame(req.body)
  const jsonGame = formatRecentGame(game.toJSON())
  res.status(200).json(jsonGame)
}
