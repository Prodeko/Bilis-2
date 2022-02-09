import type { NextApiRequest, NextApiResponse } from "next"
import { MethodNotAllowedError, ValidationError } from "../../../common/exceptions"
import withAPIMiddleware from "../../../common/middleware"
import type { Game } from "../../../common/types"

const gameHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Game>
) => {
  const { 
    query: { id },
    method
  } = req

  var id_number = parseInt(id.toString(),10)

  if(isNaN(id_number)) {
    throw new ValidationError("game_id", "Invalid game id.")
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
    case undefined: // this case is probably not possible but let's keep linter happy
      throw new MethodNotAllowedError("", ["GET"])
    default:
      throw new MethodNotAllowedError(method, ["GET"])
  }

}

export default withAPIMiddleware(gameHandler)