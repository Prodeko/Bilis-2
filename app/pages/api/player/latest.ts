import type { NextApiRequest, NextApiResponse } from 'next'

import type { Player } from '@common/types'
import { getLatestPlayers } from '@server/db/players'

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Player[]>) {
  const playerCount = 20
  const players = await getLatestPlayers(playerCount)
  res.status(200).json(players)
}
