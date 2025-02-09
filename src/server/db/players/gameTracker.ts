import { QueryTypes } from "sequelize";

import dbConf from "@server/utils/dbConf";

export type TimeFrame = "day" | "week" | "month" | "year";

export const getGamesFromTimeframe = async (timeFrame: TimeFrame) => {
  const [response] = (await dbConf.sequelize.query(
    `--sql
    SELECT COUNT(*) AS nof_games
    FROM games
    WHERE date_trunc('${timeFrame}', created_at::date) = date_trunc('${timeFrame}', CURRENT_DATE)
  `,
    { type: QueryTypes.SELECT },
  )) as [
    {
      nof_games: number;
    },
  ];
  return response.nof_games;
};
