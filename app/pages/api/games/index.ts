import type { NextApiRequest, NextApiResponse } from "next";
import * as gameAPI from "../../../common/db/games";
import withAPIMiddleware from "../../../common/middleware";
import { 
  validateRequest, 
  numberValidator, 
  booleanValidator, 
  validateMutualPlayersQuery, 
  validatePageQuery 
} from "../../../common/validators";
import { MethodNotAllowedError } from "../../../common/exceptions";
import { getMutualGames } from "../../../common/db/services/gameService";
import { RequestWithPage } from "../../../common/types";

const createGamesStructure = {
    winnerId: numberValidator,
    loserId: numberValidator,
    underTable: booleanValidator,
};


const handleGames = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    method,
    body
  } = req;

  switch (method) {
    case "POST":
      
      // validate body
      let validatedData = validateRequest(body, createGamesStructure);
      
      
      // Update or create data in your database
      gameAPI.addGame(
        validatedData.winnerId,
        validatedData.loserId,
        validatedData.underTable
      )
      // return empty response with proper status code
      
      res.status(201).end();
      break;

    case 'GET':
      const [id1, id2] = validateMutualPlayersQuery(req.query);
      const { page, pageSize } = validatePageQuery(req.query);
      const games = await getMutualGames(id1, id2, page, pageSize);
      res.json(games);
      break;
    case undefined: // this case is probably not possible but let's keep linter happy
      throw new MethodNotAllowedError("", ["GET","POST"]);
    default:
      throw new MethodNotAllowedError(method, ["GET","POST"]);
  }
}

export default withAPIMiddleware(handleGames);