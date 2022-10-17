import { isString } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

import { searchPlayers } from '@server/db/players'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = req.query.query as unknown

    if (isString(query)) {
      const players = await searchPlayers(query)
      res.status(200).json(players)
    } else {
      res.status(400).json({ error: 'ID must be type of string' })
    }
  }
}
