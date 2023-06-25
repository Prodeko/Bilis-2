import { QueryTypes } from 'sequelize'

import dbConf from '@server/utils/dbConf'

export type TimeFrame = 'day' | 'week' | 'month' | 'year'

export const getGamesFromTimeframe = async (timeFrame: TimeFrame) => {
  const [response] = (await dbConf.sequelize.query(
    `--sql
    SELECT
      date_trunc('${timeFrame}', created_at::date) as date, 
      COUNT(*) AS nof_games
    FROM games
    GROUP BY date_trunc('${timeFrame}', created_at::date)
    ORDER BY date DESC
    LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  )) as [
    {
      date: string
      nof_games: number
    }
  ]
  return response.nof_games
}
