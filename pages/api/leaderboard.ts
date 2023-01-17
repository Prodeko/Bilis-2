import type { NextApiRequest, NextApiResponse } from 'next'

import type { Player } from '@common/types'
import { isNumber, isString } from '@common/types/guards'
import { getPlayers } from '@server/db/players'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Player[] | { message: string }>
) {
  const query = req.query.amount
  if (!query || !isString(query)) {
    res.status(400).json({ message: 'Query value "amount" is not of type string' })
    return // without this typescript doesn't realize that query is of type string
  }

  const amount = parseInt(query, 10)
  if (isNumber(amount)) {
    const leaderboard = await getPlayers(amount)
    res.status(200).json(leaderboard)
  } else {
    res.status(400).json({ message: 'Amount is not a number' })
  }
}
