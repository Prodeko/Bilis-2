import { isString } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

import { searchPlayers, createPlayer } from '@server/db/players'
import { isNewPlayer } from '@common/types/guards'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = req.query.query as unknown
    const includeStats = req.query.stats === 'true'

    if (isString(query)) {
      const players = await searchPlayers(query, includeStats, 20)
      res.status(200).json(players)
    } else {
      res.status(400).json({ error: 'ID must be type of string' })
    }
  } else if (req.method === 'POST') {
    const supposedPlayer = req.body as unknown
    if (isNewPlayer(supposedPlayer)) {
      try {
        const createdPlayer = await createPlayer(supposedPlayer)
        res.status(200).json(createdPlayer)
      } catch (e) {
        res.status(400).json({ error: e })
      }
    }
  }
}
