import type { NextApiRequest, NextApiResponse } from 'next'
import { getRecentGames } from '@server/db/games'
import { RecentGame } from '@common/types'
import { isString } from 'lodash'

export default async function handler(req: NextApiRequest, res: NextApiResponse<RecentGame[]>) {
  if (isString(req.query.offset)) {
    const offset = parseInt(req.query.offset)
    res.status(200).json(await getRecentGames(20, offset))
  } else {
    res.status(200).json(await getRecentGames(20))
  }
}
