import { Op } from 'sequelize'

import type { CreateGameType } from '@common/types'
import { getScoreChange } from '@common/utils/gameStats'
import { getPlayerById, updatePlayerById } from '@server/db/players'
import { GameModel, PlayerModel } from '@server/models'

import { getCurrentSeason } from '../seasons'
import { getGameCountForPlayer, getSeasonGameCountForPlayer } from './derivatives'

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

  let winnerSeasonEloAfter = null
  let loserSeasonEloAfter = null

  const seasonId = currentSeason?.id ?? null

  if (seasonId) {
    const winnerSeasonGames = await getSeasonGameCountForPlayer(game.winnerId, seasonId)
    const loserSeasonGames = await getSeasonGameCountForPlayer(game.loserId, seasonId)

    const winnerSeasonElo = winner.latestSeasonId === seasonId ? winner.seasonElo : 400
    const loserSeasonElo = loser.latestSeasonId === seasonId ? loser.seasonElo : 400

    const [winnerEloChange, loserEloChange] = getScoreChange(
      winnerSeasonElo,
      winnerSeasonGames,
      loserSeasonElo,
      loserSeasonGames
    )

    winnerSeasonEloAfter = winnerSeasonElo + winnerEloChange
    loserSeasonEloAfter = loserSeasonElo + loserEloChange
  }

  const createdGame = await GameModel.scope('withTime').create(
    {
      ...game,
      winnerEloAfter,
      loserEloAfter,
      winnerEloBefore: winner.elo,
      loserEloBefore: loser.elo,
      winnerSeasonEloAfter,
      loserSeasonEloAfter,
      winnerSeasonEloBefore: winner.seasonElo,
      loserSeasonEloBefore: loser.seasonElo,
      seasonId,
    },
    {
      include: [
        { model: PlayerModel, as: 'winner' },
        { model: PlayerModel, as: 'loser' },
      ],
    }
  )

  // Set the season stuff as undefined if they don't exist eg. there is no season at the moment
  // This ensures that the season data reflects the latest season stats
  await Promise.all([
    updatePlayerById(winner.id, {
      elo: winnerEloAfter,
      seasonElo: winnerSeasonEloAfter ?? undefined,
      latestSeasonId: seasonId ?? undefined,
    }),
    updatePlayerById(loser.id, {
      elo: loserEloAfter,
      seasonElo: loserSeasonEloAfter ?? undefined,
      latestSeasonId: seasonId ?? undefined,
    }),
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
