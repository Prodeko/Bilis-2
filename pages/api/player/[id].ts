import { round } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

import type { Player } from '@common/types'
import { isNumber } from '@common/types/guards'
import { getPlayerStats } from '@server/db/games'
import { getPlayerById } from '@server/db/players'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id) as unknown
  if (!isNumber(id)) {
    return res.status(400).json({ error: 'ID must be type of number' })
  }

  if (req.method === 'GET') {
    const [player, playerStats] = await Promise.all([getPlayerById(id), getPlayerStats(id)])

    if (player) {
      const jsonPlayer = player.toJSON() as Player
      return res.status(200).json({
        ...jsonPlayer,
        ...playerStats,
        winPercentage: round(playerStats.winPercentage, 2).toFixed(2),
        elo: round(jsonPlayer.elo, 2).toFixed(2),
      })
    }
    return res.status(404).json({ error: `No player found with ID ${id}` })
  }
  return res.status(405)
}
