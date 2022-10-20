import type { NextApiRequest, NextApiResponse } from 'next'

import { isNumber } from '@common/types/guards'
import { getPlayerStats } from '@server/db/games'
import { getPlayerById } from '@server/db/players'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = Number(req.query.id)

    // We had isNumber type guard but it did not work properly when the we had a number as a string like "2"
    if (!isNaN(id)) {
      const [player, playerStats] = await Promise.all([getPlayerById(id), getPlayerStats(id)])

      if (player) {
        res.status(200).json({
          ...player.toJSON(),
          ...playerStats,
        })
      } else {
        res.status(404).json({ error: `No player found with ID ${id}` })
      }
    } else {
      res.status(400).json({ error: 'ID must be type of number' })
    }
  }
}
