import { Op } from 'sequelize'

import type {
  GameWithPlayers,
  MutualGames,
  NewGame,
  RecentGame,
  TimeSeriesGame,
} from '@common/types'
import { ZEROTH_GAME } from '@common/utils/constants'
import { getScoreChange } from '@common/utils/gameStats'
import { getPlayerById, updatePlayerById } from '@server/db/players'
import { GameModel, PlayerModel } from '@server/models'

const getGameCountForPlayer = async (playerId: number): Promise<number> => {
  return GameModel.count({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
  })
}

const getPlayerOrderedGames = async (playerId: number): Promise<GameModel[]> =>
  GameModel.findAll({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
    order: [['createdAt', 'ASC']],
  })

const getPlayerDetailedGames = async (playerId: number) => {
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

const getLatestGames = async (n = 20, offset = 0): Promise<GameWithPlayers[]> => {
  const { rows: games } = await GameModel.findAndCountAll({
    order: [['createdAt', 'DESC']],
    include: [
      { model: PlayerModel, as: 'winner' },
      { model: PlayerModel, as: 'loser' },
    ],
    limit: n,
    offset: offset * n,
  })

  const jsonGames = games.map(g => g.toJSON()) as GameWithPlayers[]
  return jsonGames
}

const getRecentGames = async (n = 20, offset = 0) => {
  const recentGames = await getLatestGames(n, offset)

  return recentGames.map(formatRecentGame)
}

const formatRecentGame = (game: GameWithPlayers): RecentGame => ({
  ...game,
  winnerEloAfter: game.winnerEloAfter,
  winnerEloBefore: game.winnerEloBefore,
  loserEloAfter: game.loserEloAfter,
  loserEloBefore: game.loserEloBefore,
  time: new Date(game.createdAt).toLocaleString('fi-FI', {
    dateStyle: 'short',
    timeStyle: 'short',
  }),
  winner: `${game.winner.emoji} ${game.winner.firstName} "${game.winner.nickname}" ${game.winner.lastName}`,
  loser: `${game.loser.emoji} ${game.loser.firstName} "${game.loser.nickname}" ${game.loser.lastName}`,
})

type CreateGameType = Pick<NewGame, 'winnerId' | 'loserId' | 'underTable'>

const createGame = async (game: CreateGameType) => {
  const [winner, loser, winnerGames, loserGames] = await Promise.all([
    getPlayerById(game.winnerId),
    getPlayerById(game.loserId),
    getGameCountForPlayer(game.winnerId),
    getGameCountForPlayer(game.loserId),
  ])

  if (!winner) throw Error(`Player with id ${game.winnerId} not found`)
  if (!loser) throw Error(`Player with id ${game.loserId} not found`)
  const [winnerEloChange, loserEloChange] = getScoreChange(
    winner.elo,
    winnerGames,
    loser.elo,
    loserGames
  )
  const winnerEloAfter = winner.elo + winnerEloChange
  const loserEloAfter = loser.elo + loserEloChange
  const createdGame: GameWithPlayers = (
    await GameModel.create(
      {
        ...game,
        winnerEloAfter,
        loserEloAfter,
        winnerEloBefore: winner.elo,
        loserEloBefore: loser.elo,
      },
      {
        include: [
          { model: PlayerModel, as: 'winner' },
          { model: PlayerModel, as: 'loser' },
        ],
      }
    )
  ).toJSON() as GameWithPlayers

  await Promise.all([
    updatePlayerById(winner.id, { elo: winnerEloAfter }),
    updatePlayerById(loser.id, { elo: loserEloAfter }),
  ])
  return formatRecentGame(createdGame)
}

const removeLatestGame = async () => {
  const latest = await GameModel.findOne({
    order: [['createdAt', 'DESC']],
  })

  if (!latest) throw Error('No games in database')

  // Delete the game and remove update player players' elos
  await Promise.all([
    GameModel.destroy({
      where: {
        id: latest.id,
      },
    }),
    updatePlayerById(latest.winnerId, { elo: latest.winnerEloBefore }),
    updatePlayerById(latest.loserId, { elo: latest.loserEloBefore }),
  ])

  return latest
}

// NOTE!! Only use in dev, destroys everything in database
const clearGamesDEV = () =>
  GameModel.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })

export {
  removeLatestGame,
  createGame,
  getGameCountForPlayer,
  getPlayerOrderedGames,
  getLatestGames,
  clearGamesDEV,
  getRecentGames,
  getMutualGamesCount,
  getPlayerDetailedGames,
}
