import type { NextApiResponse } from "next";
import { getMutualGames } from "../../../common/db/services/gameService";
import withAPIMiddleware from "../../../common/middleware";
import { RequestWithPage } from "../../../common/types";
import { validateMutualPlayersQuery, validatePageQuery } from "../../../common/validators";

const handler = async (
  req: RequestWithPage,
  res: NextApiResponse
) => {
  const [id1, id2] = validateMutualPlayersQuery(req.query);
  const { page, pageSize } = validatePageQuery(req.query);
  const games = await getMutualGames(id1, id2, page, pageSize);
  res.json(games);
}


export default withAPIMiddleware(handler);