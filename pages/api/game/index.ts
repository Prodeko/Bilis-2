import type { NextApiRequest, NextApiResponse } from 'next'

import { RecentGame } from '@common/types'
import { createGame } from '@server/db/games'
import { formatRecentGame } from '@server/db/games/derivatives'

export default async function handler(req: NextApiRequest, res: NextApiResponse<RecentGame>) {
  const game = await createGame(req.body)
  const jsonGame = formatRecentGame(game)
  res.status(200).json(jsonGame)
}
