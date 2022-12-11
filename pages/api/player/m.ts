import { Player } from '@common/types'
import { getPlayerById } from '@server/db/players'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const id = 935
  const player = await getPlayerById(id)

  if (!player) {
    return res.status(200).send(undefined)
  }

  const jsonPlayer = player.toJSON() as Player
  return res.status(200).json(jsonPlayer)
}
