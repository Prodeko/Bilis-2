import type { NextApiRequest, NextApiResponse } from 'next'

import type { Player } from '@common/types'
import { NOF_LATEST_PLAYERS } from '@common/utils/constants'
import { getLatestPlayers } from '@server/db/players'

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Player[]>) {
  const players = await getLatestPlayers(NOF_LATEST_PLAYERS)
  res.status(200).json(players)
}
