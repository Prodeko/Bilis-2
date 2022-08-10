import type { NextApiRequest, NextApiResponse } from 'next'
import type { HomeLeaderboard } from '@common/types'
import { getPlayers } from '@common/db/players'

export default async function handler(req: NextApiRequest, res: NextApiResponse<HomeLeaderboard>) {
  const leaderboard = await getPlayers()
  res.status(200).json(leaderboard)
}
