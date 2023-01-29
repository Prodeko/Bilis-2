import { getPlayerOrderedGames } from '.'
import { Op } from 'sequelize'

import { GameWithPlayers, MutualGames, PlayerStats, TimeSeriesGame } from '@common/types'
import { ZEROTH_GAME } from '@common/utils/constants'
import { computePlayerStats } from '@common/utils/helperFunctions'
import { GameModel, PlayerModel } from '@server/models'

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

const getPlayerDetailedGames = async (playerId: number): Promise<TimeSeriesGame[]> => {
  const games = await GameModel.findAll({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
    include: [
      {
        model: PlayerModel,
        as: 'winner',
      },
      {
        model: PlayerModel,
        as: 'loser',
      },
    ],
    order: [['createdAt', 'ASC']],
  })
  const jsonGames = games.map(game => game.toJSON()) as GameWithPlayers[]

  const createTimeSeriesGame = async (game: GameWithPlayers): Promise<TimeSeriesGame> => {
    const isWinner = game.winnerId === playerId
    const currentElo = isWinner ? game.winnerEloAfter : game.loserEloAfter
    const eloDiff = isWinner
      ? game.winnerEloAfter - game.winnerEloBefore
      : game.loserEloAfter - game.loserEloBefore
    const opponent = isWinner
      ? game.loser.firstName + ' ' + game.loser.lastName
      : game.winner.firstName + ' ' + game.winner.lastName
    return { currentElo, opponent, eloDiff }
  }

  const playedGames = await Promise.all(jsonGames.map(createTimeSeriesGame))
  const gameData = [ZEROTH_GAME, ...playedGames]

  return gameData
}

const getMutualGamesCount = async (
  currentPlayerId: number,
  opposingPlayerId: number
): Promise<MutualGames> => {
  const [currentPlayerGamesWon, opposingPlayerGamesWon] = await Promise.all([
    GameModel.count({
      where: {
        winnerId: currentPlayerId,
        loserId: opposingPlayerId,
      },
    }),
    GameModel.count({
      where: {
        winnerId: opposingPlayerId,
        loserId: currentPlayerId,
      },
    }),
  ])
  const totalGames = currentPlayerGamesWon + opposingPlayerGamesWon

  return {
    currentPlayerGamesWon,
    opposingPlayerGamesWon,
    totalGames,
  }
}

export { getPlayerStats, getGameCountForPlayer, getPlayerDetailedGames, getMutualGamesCount }
