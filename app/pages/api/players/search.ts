import type { NextApiRequest, NextApiResponse } from "next";
import type {
  Player,
  PlayerMeta,
  ValidationError,
} from "../../../common/types";
import { playerAPI } from "../../../common/db/players";

export default async function playerHandler(
  req: NextApiRequest,
  res: NextApiResponse<PlayerMeta[]>
) {
  const {
    query: { keywords },
    method,
  } = req;

  switch (method) {
    case "GET":
      // Get data from your database

      res
        .status(200)
        .json(
          await playerAPI.searchByKeywords(
            typeof keywords === "string" ? keywords : keywords.join(" ")
          )
        );
      break;

    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
