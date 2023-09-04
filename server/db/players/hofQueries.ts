import { QueryTypes } from 'sequelize'

import { HofPlayer, hofPlayer } from '@common/types'
import { GameModel, PlayerModel } from '@server/models'
import dbConf from '@server/utils/dbConf'

/**
This file includes queries used to compute hall of fame statistics. Functions in this file should return 
objects that have fields from player type and also a field called "hofStat" that is in formatted form.
We format the stat already in the backend because this simplifies the frontend code greatly.
 */

const getHighestEloAllTimePlayer = async (): Promise<HofPlayer> => {
  const [response] = (await dbConf.sequelize.query(
    `--sql
      SELECT winner_id, winner_elo_after
      FROM games
      ORDER BY winner_elo_after DESC
      LIMIT 1
    `,
    { type: QueryTypes.SELECT }
  )) as [
    {
      winner_id: number
      winner_elo_after: number
    }
  ]

  const topPlayer = await PlayerModel.findOne({
    where: {
      id: response?.winner_id,
    },
  })

  if (!response || !topPlayer) throw new Error('No top player or top player game found!')

  const hallOfFamePlayer = {
    ...topPlayer.toJSON(),
    hofStat: response.winner_elo_after.toFixed(2),
  }
  return hofPlayer.parse(hallOfFamePlayer)
}

const getHighestWinPercentage = async (): Promise<HofPlayer> => {
  const [response] = (await dbConf.sequelize.query(
    `--sql
    WITH lost_games AS (
      SELECT loser_id, COUNT(*) as lost_games_count 
      FROM games 
      GROUP BY loser_id
    ),

    won_games AS (
      SELECT winner_id, COUNT(*) as won_games_count
      FROM games 
      GROUP BY winner_id
    )

    SELECT 
      winner_id, 
      CAST((won_games_count * 100.0) / (won_games_count + lost_games_count) AS REAL) as win_percentage
    FROM won_games
    JOIN lost_games
    ON winner_id = loser_id
    GROUP BY winner_id, won_games_count, lost_games_count
    ORDER BY win_percentage DESC
    LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  )) as [
    {
      winner_id: number
      win_percentage: number
    }
  ]

  const player = await PlayerModel.findOne({ where: { id: response.winner_id } })

  if (!player) throw new Error('No player found!')

  const hallOfFamePlayer = {
    ...player.toJSON(),
    hofStat: `${response.win_percentage.toFixed(1)}%`,
  }
  return hofPlayer.parse(hallOfFamePlayer)
}

const getHighestStreak = async (): Promise<HofPlayer> => {
  // NOTE: The following query is pretty advanced and uses some tricks to get the result needed.
  const response = (await dbConf.sequelize.query(
    `--sql
      -- Based on https://stackoverflow.com/a/17839755

      -- Temporary view of games table where the winning and losing sides are merged to one colum
      WITH transformed_data AS (
        SELECT id, winner_id as player_id, true AS is_winner
        FROM games
        UNION
        SELECT id, loser_id as player_id, false AS is_winner
        FROM games
      ),

      -- "Edge detection" of streaks: boundaries where a game is won and the previous game was lost
      new_streaks AS (
        SELECT id, player_id, is_winner,
          is_winner AND NOT lag(is_winner, 1, false) over (PARTITION BY player_id ORDER BY id ROWS BETWEEN 1 PRECEDING AND CURRENT ROW) as is_beginning_of_new_streak
        FROM transformed_data
      ), 

      -- Add the number of "edges", aka. new streaks, to each game.
      -- This effectively gives each streak an identifier, and associates each won game with one such identifier.
      streak_id AS (
        SELECT 
          player_id,
          SUM(is_beginning_of_new_streak::int) OVER (PARTITION BY player_id ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) as streak_id
        FROM new_streaks
        WHERE is_winner = true
      ),
      
      -- Count the number of records per streak
      records_per_streak as (
        SELECT player_id, streak_id, COUNT(*) as streak_length
        FROM streak_id
        GROUP BY player_id, streak_id
      )


      -- Select the longest streak
      SELECT player_id, streak_length
      FROM records_per_streak
      ORDER BY streak_length DESC
      LIMIT 1;
  `,
    { type: QueryTypes.SELECT }
  )) as [{ player_id: number; streak_length: number }]

  if (!response) throw new Error('No games in database')

  const player = await PlayerModel.findOne({
    where: {
      id: response[0].player_id,
    },
  })

  if (!player) throw new Error('No player found!')

  const hallOfFamePlayer = { ...player.toJSON(), hofStat: response[0].streak_length }
  return hofPlayer.parse(hallOfFamePlayer)
}

const getMostGamesPlayed = async (): Promise<HofPlayer> => {
  const [response] = (await dbConf.sequelize.query(
    `--sql
    WITH game_participants AS (
      SELECT winner_id AS player_id, created_at
      FROM games
      UNION ALL
      SELECT loser_id AS player_id, created_at
      FROM games
    )

    SELECT player_id as id, count(player_id) as nof_played_games
    FROM game_participants
    GROUP BY player_id
    ORDER BY nof_played_games DESC
    LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  )) as [
    {
      id: number
      nof_played_games: number
    }
  ]

  const player = await PlayerModel.findOne({ where: { id: response.id } })

  if (!player) throw new Error('No player found!')

  const hallOfFamePlayer = {
    ...player.toJSON(),
    hofStat: response.nof_played_games,
  }
  return hofPlayer.parse(hallOfFamePlayer)
}

const getMostUndertableWins = async (): Promise<HofPlayer> => {
  const [response] = (await dbConf.sequelize.query(
    `--sql
    SELECT players.id, COUNT(games.id) as nof_undertable_games
    FROM players
    LEFT JOIN games
    ON players.id = games.winner_id
    WHERE games.under_table = true
    GROUP BY 1
    ORDER BY nof_undertable_games DESC
    LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  )) as [
    {
      id: number
      nof_undertable_games: number
    }
  ]

  const player = await PlayerModel.findOne({ where: { id: response.id } })

  if (!player) throw new Error('No player found!')

  const hallOfFamePlayer = {
    ...player.toJSON(),
    hofStat: response.nof_undertable_games,
  }
  return hofPlayer.parse(hallOfFamePlayer)
}

const getMostPlayedGamesInOneDay = async (): Promise<HofPlayer> => {
  const [response] = (await dbConf.sequelize.query(
    `--sql
    WITH game_participants AS (
      SELECT winner_id AS player_id, created_at
      FROM games
      UNION ALL
      SELECT loser_id AS player_id, created_at
      FROM games
    )

    SELECT 
      players.id, 
      date_trunc('day', game_participants.created_at::date) as date,
      COUNT(game_participants.player_id) as nof_games
    FROM players
    JOIN game_participants
    ON players.id = game_participants.player_id
    GROUP BY 1,2
    ORDER BY nof_games DESC
    LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  )) as [
    {
      id: number
      nof_games: number
    }
  ]

  const player = await PlayerModel.findOne({ where: { id: response.id } })

  if (!player) throw new Error('No player found!')

  const hallOfFamePlayer = {
    ...player.toJSON(),
    hofStat: response.nof_games,
  }
  return hofPlayer.parse(hallOfFamePlayer)
}

export {
  getHighestEloAllTimePlayer,
  getHighestStreak,
  getHighestWinPercentage,
  getMostGamesPlayed,
  getMostUndertableWins,
  getMostPlayedGamesInOneDay,
}
