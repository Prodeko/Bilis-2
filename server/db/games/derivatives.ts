import { getLatestGames, getPlayerOrderedGames } from '.'
import { Op } from 'sequelize'

import {
  GameWithPlayers,
  MutualGames,
  PlayerStats,
  RecentGame,
  TimeSeriesGame,
} from '@common/types'
import { ZEROTH_GAME } from '@common/utils/constants'
import {
  computePlayerStats,
  formatFullName,
  formatIsoStringToDate,
} from '@common/utils/helperFunctions'
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

const getSeasonGameCountForPlayer = async (playerId: number, seasonId: number): Promise<number> =>
  GameModel.count({
    where: {
      [Op.and]: [{ [Op.or]: [{ winnerId: playerId }, { loserId: playerId }] }, { seasonId }],
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

const getRecentGames = async (n = 20, offset = 0): Promise<RecentGame[]> => {
  const recentGames = await getLatestGames(n, offset)

  return recentGames.map(formatRecentGame)
}

const formatRecentGame = (game: GameModel): RecentGame => {
  if (!game.winner) {
    throw new Error('Error in formatting recent game: winner missing!')
  } else if (!game.loser) {
    throw new Error('Error in formatting recent game: loser missing!')
  }
  return {
    id: game.id,
    winnerId: game.winnerId,
    loserId: game.loserId,
    winnerEloBefore: game.winnerEloBefore,
    winnerEloAfter: game.winnerEloAfter,
    loserEloBefore: game.loserEloBefore,
    loserEloAfter: game.loserEloAfter,
    underTable: game.underTable,
    formattedTimeString: formatIsoStringToDate(game.createdAt.toISOString()),
    winner: `${formatFullName(game.winner, true, true)}`,
    loser: `${formatFullName(game.loser, true, true)}`,
  }
}

// NOTE!! Only use in dev, destroys everything in database
const clearGamesDEV = (): Promise<number> =>
  GameModel.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })

export {
  getPlayerStats,
  getGameCountForPlayer,
  getSeasonGameCountForPlayer,
  getPlayerDetailedGames,
  getMutualGamesCount,
  getRecentGames,
  formatRecentGame,
  clearGamesDEV,
}
