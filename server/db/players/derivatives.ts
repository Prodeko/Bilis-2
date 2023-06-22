import { PlayerWithMaxElo } from '@common/types'
import { GameModel, PlayerModel } from '@server/models'

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

export { getHighestEloAllTimePlayer }
