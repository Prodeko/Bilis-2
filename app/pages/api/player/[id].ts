import type { NextApiRequest, NextApiResponse } from 'next'
import type { PlayerStats } from '@common/types'
import { getPlayerById } from '@server/db/players'
import { isNumber } from '@common/types/guards'
import { getPlayerStats } from '@server/db/games'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = req.query.id as unknown

    if (isNumber(id)) {
      const player = await getPlayerById(id)
      const playerStats: PlayerStats = await getPlayerStats(id)

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
