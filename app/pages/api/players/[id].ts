import type { NextApiRequest, NextApiResponse } from 'next'
import type { Player, ValidationError } from '../../../common/types'

export default function playerHandler(
    req: NextApiRequest,
    res: NextApiResponse<Player | ValidationError>
  ) {
    const {
      query: { id },
      method,
    } = req

    var id_number = parseInt(id.toString(),10)

    if(isNaN(id_number)) {
      res.status(400).json({ "field": "player_id", "message": "Invalid player id." })
    }

  
    switch (method) {
      case 'GET':
        // Get data from your database
        res.status(200).json({ 
          id: id_number, 
          first_name: `User ${id_number}`,
          last_name: "na",
          elo: 0,
          fav_color: "na",
          fav_ball: "na",
          nickname: "na",
          emoji: "na"
         })
        break
      case 'PUT':
        // Update or create data in your database
        res.status(200).json({ 
          id: id_number, 
          first_name: `User ${id_number}`,
          last_name: "na",
          elo: 0,
          fav_color: "na",
          fav_ball: "na",
          nickname: "na",
          emoji: "na"
         })
        break
      default:
        res.setHeader('Allow', ['GET', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  }