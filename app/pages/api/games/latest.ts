import type { NextApiRequest, NextApiResponse } from "next";
import * as gameAPI from "../../../common/db/games";
import withAPIMiddleware from "../../../common/middleware";
import { MethodNotAllowedError } from "../../../common/exceptions";

const handleLatestGames = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    method,
    body
  } = req;

  switch (method) {
    case "GET":
      res
        .status(200)
        .json(
          await gameAPI.getLatestGames()
        );
      break;

    case undefined: // this case is probably not possible but let's keep linter happy
      throw new MethodNotAllowedError("", ["GET"]);
    default:
      throw new MethodNotAllowedError(method, ["GET"]);
  }
}


export default withAPIMiddleware(handleLatestGames)