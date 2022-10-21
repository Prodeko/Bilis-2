import type { NextApiRequest, NextApiResponse } from 'next'
import { isNumber } from '@common/types/guards'
import { getPlayerById } from '@server/db/players'
import { getMutualGamesCount } from '@server/db/games'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const currentPlayerId = req.query.id1 as unknown
    const opposingPlayerId = req.query.id2 as unknown

    if (isNumber(currentPlayerId) && isNumber(opposingPlayerId)) {
      const [currentPlayer, opposingPlayer] = await Promise.all([
        getPlayerById(currentPlayerId),
        getPlayerById(opposingPlayerId),
      ])

      if (!currentPlayer) {
        res.status(404).json({ error: `No player found with ID ${currentPlayerId}` })
      } else if (!opposingPlayer) {
        res.status(404).json({ error: `No player found with ID ${opposingPlayerId}` })
      } else {
        const mutualGamesStats = await getMutualGamesCount(currentPlayerId, opposingPlayerId)
        res.status(200).json(mutualGamesStats)
      }
    } else {
      res.status(400).json({ error: 'IDs must be type of number' })
    }
  }
}
