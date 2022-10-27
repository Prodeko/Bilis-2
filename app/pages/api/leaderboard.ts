import type { NextApiRequest, NextApiResponse } from 'next'

import type { HomeLeaderboard } from '@common/types'
import { getPlayers } from '@server/db/players'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HomeLeaderboard | { message: string }>
) {
  const query = req.query.amount
  let amount: number | undefined
  if (typeof query === 'string') {
    amount = parseInt(query, 10)
    if (Number.isNaN(amount)) {
      res.status(400).json({ message: 'Amount is not a number' })
    }
  }
  const leaderboard = await getPlayers(amount)
  res.status(200).json(leaderboard)
}
