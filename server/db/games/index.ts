import { Op } from 'sequelize'

import type { CreateGameType } from '@common/types'
import { getScoreChange } from '@common/utils/gameStats'
import { getPlayerById, updatePlayerById } from '@server/db/players'
import { GameModel, PlayerModel } from '@server/models'

import { getGameCountForPlayer } from './derivatives'

const getPlayerOrderedGames = async (playerId: number): Promise<GameModel[]> =>
  GameModel.findAll({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
    order: [['createdAt', 'ASC']],
  })

const getLatestGames = async (n = 20, offset = 0): Promise<GameModel[]> =>
  GameModel.scope('withTime').findAll({
    order: [['createdAt', 'DESC']],
    include: [
      { model: PlayerModel, as: 'winner' },
      { model: PlayerModel, as: 'loser' },
    ],
    limit: n,
    offset: offset * n,
  })

const createGame = async (game: CreateGameType): Promise<GameModel> => {
  const playerInfo = await getPlayerInfoForNewGameOrThrow(game)

  const effects = calculateNewGameEffects(game, playerInfo)

  const createdGame = await GameModel.scope('withTime').create(effects.createdGameObject, {
    include: [
      { model: PlayerModel, as: 'winner' },
      { model: PlayerModel, as: 'loser' },
    ],
  })

  await Promise.all([
    updatePlayerById(effects.winnerUpdateInfo.id, { elo: effects.winnerUpdateInfo.elo }),
    updatePlayerById(effects.loserUpdateInfo.id, { elo: effects.loserUpdateInfo.elo }),
  ])

  return createdGame
}

const getPlayerInfoForNewGameOrThrow = async (game: CreateGameType) => {
  const [winner, loser, winnerGames, loserGames] = await Promise.all([
    getPlayerById(game.winnerId),
    getPlayerById(game.loserId),
    getGameCountForPlayer(game.winnerId),
    getGameCountForPlayer(game.loserId),
  ])

  if (!winner) throw Error(`Player with id ${game.winnerId} not found`)
  if (!loser) throw Error(`Player with id ${game.loserId} not found`)

  return { winner, loser, winnerGames, loserGames }
}

const calculateNewGameEffects = (
  gameInfo: CreateGameType,
  playerInfo: { winner: PlayerModel; loser: PlayerModel; winnerGames: number; loserGames: number }
) => {
  const [winner, loser, winnerGames, loserGames] = [
    playerInfo.winner,
    playerInfo.loser,
    playerInfo.winnerGames,
    playerInfo.loserGames,
  ]

  const [winnerEloChange, loserEloChange] = getScoreChange(
    winner.elo,
    winnerGames,
    loser.elo,
    loserGames
  )

  const winnerEloAfter = winner.elo + winnerEloChange
  const loserEloAfter = loser.elo + loserEloChange

  const createdGameObject = {
    winnerId: gameInfo.winnerId,
    winnerEloBefore: winner.elo,
    winnerEloAfter,

    loserId: gameInfo.loserId,
    loserEloBefore: loser.elo,
    loserEloAfter,

    underTable: gameInfo.underTable,
  }
  const winnerUpdateInfo = {
    id: winner.id,
    elo: winnerEloAfter,
  }
  const loserUpdateInfo = {
    id: loser.id,
    elo: loserEloAfter,
  }
  return { createdGameObject, winnerUpdateInfo, loserUpdateInfo }
}

const removeLatestGame = async (): Promise<GameModel> => {
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

export {
  removeLatestGame,
  createGame,
  getPlayerOrderedGames,
  getLatestGames,
  calculateNewGameEffects,
}
