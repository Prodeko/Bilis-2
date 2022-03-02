import type { NextApiRequest, NextApiResponse } from "next";
import { getMutualGames } from "../../../common/db/services/gameService";
import withAPIMiddleware from "../../../common/middleware";
import { validateMutualPlayersQuery } from "../../../common/validators";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const [id1, id2] = validateMutualPlayersQuery(req.query);
  const { rows, count } = await getMutualGames(id1, id2);
  const wins1 = rows.reduce((acc, game) => game.winnerId === id1 ? 1 : 0 + acc, 0);
  const wins2 = count - wins1;
  res.json({ wins1, wins2 });
}


export default withAPIMiddleware(handler);