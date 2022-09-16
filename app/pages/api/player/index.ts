import type { NextApiRequest, NextApiResponse } from 'next'
import { isString } from 'lodash'
import { Player } from '@common/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const query = req.query.query as unknown

    if (isString(query)) {
      // TODO actually search players
      const p: Player[] = [
        {
          firstName: query,
          lastName: 'Mestari',
          elo: 69,
          emoji: ' 🍆',
          nickname: 'oldGangsta',
          id: 2222,
        },
      ]
      res.status(200).json(p)
    } else {
      res.status(400).json({ error: 'ID must be type of string' })
    }
  }
}
