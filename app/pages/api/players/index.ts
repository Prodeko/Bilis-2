// Endpoint /api/players actions

import type { NextApiRequest, NextApiResponse } from "next";
import { playerAPI } from "../../../common/db/players";
import { MethodNotAllowedError } from "../../../common/exceptions";
import withAPIMiddleware from "../../../common/middleware";
import {validateRequest, stringValidator, hexColorValidator} from "../../../common/validators";

const createPlayerStructure = {
    firstName: stringValidator,
    lastName: stringValidator,
    nickname: stringValidator,
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
      let validatedData = validateRequest(body, createPlayerStructure)
      
      // Update or create data in your database
      playerAPI.addPlayer(
        validatedData.firstName,
        validatedData.lastName,
        validatedData.nickname,
        validatedData.favoriteColor,
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