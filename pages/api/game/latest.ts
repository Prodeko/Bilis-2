import type { NextApiRequest, NextApiResponse } from 'next'

import { Game } from '@common/types'
import { removeLatestGame } from '@server/db/games'

export default async function handler(req: NextApiRequest, res: NextApiResponse<Game | string>) {
  if (req.method == 'DELETE') {
    const removedLatest = await removeLatestGame()
    res.status(200).json(removedLatest)
  } else {
    res.status(400).json('Method not defined')
  }
}
