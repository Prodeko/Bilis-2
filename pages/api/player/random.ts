import { NextApiRequest, NextApiResponse } from 'next'

import { Player } from '@common/types'
import { getRandomPlayer } from '@server/db/players'

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Player | { message: string }>
) {
  const player = await getRandomPlayer()

  if (player) {
    res.status(200).json(player)
  } else {
    res.status(400).json({ message: 'No players found' })
  }
}
