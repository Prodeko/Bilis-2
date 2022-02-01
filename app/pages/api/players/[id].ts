import type { NextApiRequest, NextApiResponse } from 'next'
import { isArray } from 'util'
import type { Player } from '../../../common/types'

export default function playerHandler(
    req: NextApiRequest,
    res: NextApiResponse<Player>
  ) {
    const {
      query: { id },
      method,
    } = req

  
    switch (method) {
      case 'GET':
        // Get data from your database
        res.status(200).json({ id: id, name: `User ${id}` })
        break
      case 'PUT':
        // Update or create data in your database
        res.status(200).json({ id: id, name: `User ${id}` })
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }