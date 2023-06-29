import { QueryTypes } from 'sequelize'

import dbConf from '@server/utils/dbConf'

export const getPlayersWithStats = async () => {
  const response = (await dbConf.sequelize.query(
    `--sql
    SELECT
      players.id,
      first_name,
      last_name,
      elo,
      emoji,
      COUNT(games.id)::real as game_count,
      SUM(CASE WHEN players.id = games.winner_id THEN 1 ELSE 0 END)::real as win_count,
      CASE 
        WHEN COUNT(games.id) = 0 THEN 0.0 
        ELSE (SUM(CASE WHEN players.id = games.winner_id THEN 1 ELSE 0 END) * 100.0 / COUNT(games.id))::real
      END as win_percentage
    FROM players
    LEFT JOIN games
    ON players.id = games.winner_id OR players.id = games.loser_id
    GROUP BY 1,2,3,4,5
  `,
    { type: QueryTypes.SELECT }
  )) as [
    {
      id: number
      first_name: string
      last_name: string
      elo: number
      emoji: string
      game_count: number
      win_count: number
      win_percentage: number
    }
  ]
  return response
}
