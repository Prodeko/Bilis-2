import { Op } from 'sequelize'

import type { CreateGameType } from '@common/types'
import { getScoreChange } from '@common/utils/gameStats'
import { getPlayerById, updatePlayerById } from '@server/db/players'
import { GameModel, PlayerModel } from '@server/models'

import { getCurrentSeason } from '../season'
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
  const [winner, loser, winnerGames, loserGames, currentSeason] = await Promise.all([
    getPlayerById(game.winnerId),
    getPlayerById(game.loserId),
    getGameCountForPlayer(game.winnerId),
    getGameCountForPlayer(game.loserId),
    getCurrentSeason(),
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

  const createdGame = await GameModel.scope('withTime').create(
    {
      ...game,
      winnerEloAfter,
      loserEloAfter,
      winnerEloBefore: winner.elo,
      loserEloBefore: loser.elo,
      seasonId: currentSeason?.id ?? null,
    },
    {
      include: [
        { model: PlayerModel, as: 'winner' },
        { model: PlayerModel, as: 'loser' },
      ],
    }
  )

  await Promise.all([
    updatePlayerById(winner.id, { elo: winnerEloAfter }),
    updatePlayerById(loser.id, { elo: loserEloAfter }),
  ])

  return createdGame
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

export { removeLatestGame, createGame, getPlayerOrderedGames, getLatestGames }
