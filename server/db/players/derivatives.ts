import { QueryTypes } from 'sequelize'

import { PlayerWithMaxElo, PlayerWithMaxStreak, PlayerWithStats } from '@common/types'
import { GameModel, PlayerModel } from '@server/models'
import dbConf from '@server/utils/dbConf'

const getHighestEloAllTimePlayer = async (): Promise<PlayerWithMaxElo> => {
  const topPlayerGame = await GameModel.findOne({
    attributes: {
      include: ['winnerId', 'winnerEloAfter'],
    },
    order: [['winnerEloAfter', 'DESC']],
  })

  const topPlayer = await PlayerModel.findOne({
    where: {
      id: topPlayerGame?.winnerId,
    },
  })

  if (!topPlayerGame || !topPlayer) throw new Error('No top player or top player game found!')

  return { ...topPlayer.toJSON(), maxElo: topPlayerGame.winnerEloAfter }
}

const getHighestWinPercentage = async (): Promise<PlayerWithStats> => {
  const [response] = (await dbConf.sequelize.query(
    `--sql
    SELECT 
      winner_id, 
      COUNT(*) as games_won,
      lost_games.count as games_lost,
      (COUNT(*) * 100.0) / (COUNT(*) + lost_games.count) as win_percentage
    FROM games JOIN (
      SELECT loser_id, COUNT(*) as count 
      FROM games GROUP BY loser_id
    ) as lost_games ON winner_id = lost_games.loser_id
    GROUP BY winner_id, lost_games.lost
    ORDER BY win_percentage DESC
    LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  )) as [
    {
      winner_id: number
      games_won: number
      games_lost: number
      win_percentage: number
    }
  ]

  const player = await PlayerModel.findOne({ where: { id: response.winner_id } })

  if (!player) throw new Error('No player found!')

  return {
    ...player?.toJSON(),
    wonGames: response.games_won,
    lostGames: response.games_lost,
    totalGames: response.games_won + response.games_lost,
    winPercentage: response.win_percentage,
  }
}

const getHighestStreak = async (): Promise<PlayerWithMaxStreak> => {
  // Another implementation where streak is considered as games won concurrently without any other games in between.
  // So in other words how many games have you been on the table
  /*   
  const response = (await dbConf.sequelize.query(
    `--sql
      WITH is_new_group AS (
        SELECT id, winner_id,
          CASE
            WHEN LAG(winner_id) OVER (ORDER BY id) = winner_id THEN 0
            ELSE 1
          END is_new_group
        FROM games
        ORDER BY id
      ), group_no AS (
        SELECT
          id,
          winner_id,
          SUM(is_new_group) OVER(ORDER BY id) as group_no
        FROM is_new_group
      )

      SELECT winner_id, COUNT(*) as "maxStreak"
      FROM group_no
      GROUP BY group_no, winner_id
      ORDER BY "maxStreak" DESC
      LIMIT 10
  `, 
  */

  // Implementation where streak is considered as number of consecutive games where you have not lost
  // Other players may have played games in between
  // NOTE: The following query is pretty advanced and uses some tricks to get the result needed.
  const response = (await dbConf.sequelize.query(
    `--sql
      WITH transformed_data AS (
        -- Create a temporary table to transform the data from the 'games' table
        -- is_loser stored as an int so that the amount of losses can be calculated later on
        SELECT id, winner_id as player_id, 0 AS is_loser
        FROM games
        UNION
        SELECT id, loser_id as player_id, 1 AS is_loser
        FROM games
      ), streak_id AS (
        SELECT 
          player_id,
          -- Assign a streak_id to each game based on the number of losses before it for the same player
          -- This identifies all the games within the same streak with the same streak_id
          SUM(is_loser) OVER (PARTITION BY player_id ORDER BY id) as streak_id
        FROM transformed_data
        ORDER BY id
      )

      SELECT player_id, COUNT(*) as "maxStreak"
      FROM streak_id
      -- group the games with the streak_id to get count of games within that streak
      GROUP BY streak_id, player_id
      ORDER BY "maxStreak" DESC
      LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  )) as [{ player_id: number; maxStreak: number }]

  if (!response) throw new Error('No games in database')

  const player = await PlayerModel.findOne({
    where: {
      id: response[0].player_id,
    },
  })

  if (!player) throw new Error('No player found!')

  return { ...player.toJSON(), maxStreak: response[0].maxStreak }
}

export { getHighestEloAllTimePlayer, getHighestStreak, getHighestWinPercentage }
