import type { NextApiRequest, NextApiResponse } from 'next'
import { getPlayerById } from '@common/db/players'
import { isNumber } from '@common/types/guards'
import { getGameCountForPlayer, getWinGameCountForPlayer } from '@common/db/games'
import { round } from 'lodash'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const id = req.query.id as unknown

    if (isNumber(id)) {
      const player = await getPlayerById(id)

      const [wonGames, totalGames] = await Promise.all([
        getWinGameCountForPlayer(id),
        getGameCountForPlayer(id),
      ])

      if (player) {
        res.status(200).json({
          ...player.toJSON(),
          wonGames,
          totalGames,
          winPercentage: round((wonGames / totalGames) * 100),
        })
      } else {
        res.status(404).json({ error: `No player found with ID ${id}` })
      }
    } else {
      res.status(400).json({ error: 'ID must be type of number' })
    }
  }
}
