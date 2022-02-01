import type { NextApiRequest, NextApiResponse } from "next"
import type { Game, ValidationError } from "../../../common/types"

export default function gameHandler(
  req: NextApiRequest,
  res: NextApiResponse<Game | ValidationError>
) {
  const { 
    query: { id },
    method
  } = req

  var id_number = parseInt(id.toString(),10)

  if(isNaN(id_number)) {
    res.status(400).json({ "field": "game_id", "message": "Invalid game id." })
  }

  switch (method) {
    case 'GET':
      // Get data from your database
      res.status(200).json({ 
        id: id_number, 
        winner: 1,
        loser: 2,
        datetime: new Date(),
        under_table: false,
        winner_elo: 0,
        loser_elo: 0
       })
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }

}