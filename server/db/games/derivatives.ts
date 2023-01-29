import { getPlayerOrderedGames } from '.'
import { Op } from 'sequelize'

import { PlayerStats } from '@common/types'
import { computePlayerStats } from '@common/utils/helperFunctions'
import { GameModel } from '@server/models'

const getPlayerStats = async (playerId: number): Promise<PlayerStats> => {
  const games = await getPlayerOrderedGames(playerId)

  const wonGames = games.filter(game => game.winnerId === playerId).length
  const lostGames = games.filter(game => game.loserId === playerId).length

  return computePlayerStats(wonGames, lostGames)
}

const getGameCountForPlayer = async (playerId: number): Promise<number> =>
  GameModel.count({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
  })

export { getPlayerStats, getGameCountForPlayer }
