import type { NextApiRequest, NextApiResponse } from 'next'
import { getRecentGames } from '@server/db/games'
import { RecentGame } from '@common/types'

export default async function handler(_req: NextApiRequest, res: NextApiResponse<RecentGame[]>) {
  res.status(200).json(await getRecentGames())
}
