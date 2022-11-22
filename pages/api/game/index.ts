import type { NextApiRequest, NextApiResponse } from 'next'

import { Game, RecentGame } from '@common/types'
import { createGame } from '@server/db/games'

export default async function handler(req: NextApiRequest, res: NextApiResponse<RecentGame>) {
  const game = await createGame(req.body)
  res.status(200).json(game)
}
