import type { NextApiRequest, NextApiResponse } from 'next'
import { round } from 'lodash'
import { isNumber } from '@common/types/guards'

import type { Player } from '@common/types'
import { getPlayerStats } from '@server/db/games'
import { getPlayerById } from '@server/db/players'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = Number(req.query.id) as unknown

    if (!isNumber(id)) {
      res.status(400).json({ error: 'ID must be type of number' })
      return
    }

    const [player, playerStats] = await Promise.all([getPlayerById(id), getPlayerStats(id)])
    if (!player) {
      res.status(404).json({ error: `No player found with ID ${id}` })
      return
    }

    const jsonPlayer = player.toJSON() as Player
    res.status(200).json({
      ...jsonPlayer,
      ...playerStats,
      winPercentage: round(playerStats.winPercentage, 2).toFixed(2),
      elo: round(jsonPlayer.elo, 2).toFixed(2),
    })
  }
}
