import type { NextApiRequest, NextApiResponse } from 'next'

import { isNumber } from '@common/types/guards'
import { getPlayerDetailedGames } from '@server/db/games/derivatives'

const handleFetch = async (res: NextApiResponse, id: number) => {
  const gameData = await getPlayerDetailedGames(id)

  if (!gameData) {
    return res.status(404).json({ error: `No game data found with ID ${id}` })
  }

  return res.status(200).json(gameData)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id) as unknown
  if (!isNumber(id)) {
    return res.status(400).json({ error: 'ID must be type of number' })
  }

  if (req.method === 'GET') {
    return handleFetch(res, id)
  }
  return res.status(405)
}
