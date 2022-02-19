// Endpoint /api/players actions

import type { NextApiRequest, NextApiResponse } from "next";
import { playerAPI } from "../../../common/db/players";
import { MethodNotAllowedError } from "../../../common/exceptions";
import withAPIMiddleware from "../../../common/middleware";
import {validateRequest, stringValidator, hexColorValidator} from "../../../common/validators";

const create_player_structure = {
    firstName: stringValidator,
    lastName: stringValidator,
    favoriteColor: hexColorValidator
}


const playersHandler = async (
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
      let validated_data = validateRequest(body, create_player_structure)
      
      // Update or create data in your database
      playerAPI.addPlayer(
          validated_data.firstName,
          validated_data.lastName,
          validated_data.favoriteColor,
      )
      // return empty response with proper status code
      res.status(201).json({});
      break;
    case undefined: // this case is probably not possible but let's keep linter happy
      throw new MethodNotAllowedError("", ["POST"])
    default:
      throw new MethodNotAllowedError(method, ["POST"])
  }
}


export default withAPIMiddleware(playersHandler)