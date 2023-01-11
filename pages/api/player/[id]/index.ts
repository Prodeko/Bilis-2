import type { NextApiRequest, NextApiResponse } from 'next'

import type { Player } from '@common/types'
import { isNumber } from '@common/types/guards'
import { getPlayerStats } from '@server/db/games'
import { getPlayerById, updatePlayerById } from '@server/db/players'

const handleFetch = async (res: NextApiResponse, id: number) => {
  const [player, playerStats] = await Promise.all([getPlayerById(id), getPlayerStats(id)])

  if (!player) {
    return res.status(404).json({ error: `No player found with ID ${id}` })
  }

  return res.status(200).json({
    ...player.toJSON(),
    ...playerStats,
  })
}

const handlePut = async (req: NextApiRequest, res: NextApiResponse, id: number) => {
  try {
    const player = await updatePlayerById(id, req.body)
    return res.status(200).json(player.toJSON())
  } catch (e) {
    return res.status(404).json({ error: `No player found with ID ${id}` })
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = Number(req.query.id) as unknown
  if (!isNumber(id)) {
    return res.status(400).json({ error: 'ID must be type of number' })
  }

  if (req.method === 'GET') {
    return handleFetch(res, id)
  }
  if (req.method === 'PUT') {
    return handlePut(req, res, id)
  }
  return res.status(405)
}
