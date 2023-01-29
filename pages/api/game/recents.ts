import { isString } from 'lodash'
import type { NextApiRequest, NextApiResponse } from 'next'

import { RecentGame } from '@common/types'
import { getRecentGames } from '@server/db/games/derivatives'

export default async function handler(req: NextApiRequest, res: NextApiResponse<RecentGame[]>) {
  if (isString(req.query.offset)) {
    const offset = parseInt(req.query.offset)
    res.status(200).json(await getRecentGames(20, offset))
  } else {
    res.status(200).json(await getRecentGames(20))
  }
}
