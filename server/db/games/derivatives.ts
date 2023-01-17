import { getPlayerOrderedGames } from '.'

import { PlayerStats } from '@common/types'
import { computePlayerStats } from '@common/utils/helperFunctions'

const getPlayerStats = async (playerId: number): Promise<PlayerStats> => {
  const games = await getPlayerOrderedGames(playerId)

  const wonGames = games.filter(game => game.winnerId === playerId).length
  const lostGames = games.filter(game => game.loserId === playerId).length

  return computePlayerStats(wonGames, lostGames)
}

export { getPlayerStats }
