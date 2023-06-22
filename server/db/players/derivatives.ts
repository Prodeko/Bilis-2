import { QueryTypes, Sequelize } from 'sequelize'

import { PlayerWithMaxElo, PlayerWithWinPercentage } from '@common/types'
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

const getHighestWinPercentage = async () => {
  const game = await dbConf.sequelize.query(
    `--sql
    SELECT winner_id, first_name, last_name, COUNT(*) as games_won, lost_games.count as games_lost, (COUNT(*) * 100.0) / (COUNT(*) + lost_games.count) as win_percentage
    FROM games JOIN (
      SELECT loser_id, COUNT(*) as count 
      FROM games GROUP BY loser_id
    ) as lost_games ON winner_id = lost_games.loser_id JOIN 
    players ON winner_id = players.id
    GROUP BY winner_id, first_name, last_name, lost_games.lost
    ORDER BY win_percentage DESC
    LIMIT 1
  `,
    { type: QueryTypes.SELECT }
  )

  return game
}

export { getHighestEloAllTimePlayer, getHighestWinPercentage }
