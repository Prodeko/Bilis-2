import { Op } from 'sequelize'

import type { CreateGameType, Season } from '@common/types'
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

const getLatestGames = async (n = 20, offset = 0, seasonal = false): Promise<GameModel[]> => {
  const season = seasonal && (await getCurrentSeason())
  return GameModel.scope('withTime').findAll({
    order: [['createdAt', 'DESC']],
    include: [
      { model: PlayerModel, as: 'winner' },
      { model: PlayerModel, as: 'loser' },
    ],
    limit: n,
    offset: offset * n,
    where: season
      ? {
          seasonId: season.id,
        }
      : undefined,
  })
}

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
    updatePlayerById(effects.createdGameObject.winnerId, { ...effects.winnerUpdateInfo }),
    updatePlayerById(effects.createdGameObject.loserId, { ...effects.loserUpdateInfo }),
  ])

  return createdGame
}

const getPlayerInfoForNewGameOrThrow = async (game: CreateGameType) => {
  const { winnerId, loserId } = game

  const [winner, loser, winnerGames, loserGames] = await Promise.all([
    getPlayerById(winnerId),
    getPlayerById(loserId),
    getGameCountForPlayer(winnerId),
    getGameCountForPlayer(loserId),
  ])

  const currentSeason = await getCurrentSeason()
  const [winnerSeasonGames, loserSeasonGames] =
    currentSeason != null
      ? await Promise.all([
          getSeasonGameCountForPlayer(winnerId, currentSeason.id),
          getSeasonGameCountForPlayer(loserId, currentSeason.id),
        ])
      : [null, null]

  if (!winner) throw Error(`Player with id ${game.winnerId} not found`)
  if (!loser) throw Error(`Player with id ${game.loserId} not found`)

  return {
    winner,
    loser,
    winnerGames,
    winnerSeasonGames,
    loserGames,
    loserSeasonGames,
    currentSeason,
  }
}

const calculateNewGameEffects = (
  gameInfo: CreateGameType,
  playerInfo: {
    winner: PlayerModel
    loser: PlayerModel
    winnerGames: number
    loserGames: number
    winnerSeasonGames: number | null
    loserSeasonGames: number | null
    currentSeason: Season | null
  }
) => {
  const {
    winner,
    loser,
    winnerGames,
    winnerSeasonGames,
    loserGames,
    loserSeasonGames,
    currentSeason,
  } = playerInfo

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
  let winnerSeasonElo = null
  let loserSeasonElo = null
  if (currentSeason != null) {
    winnerSeasonElo = winner.latestSeasonId === currentSeason?.id ? winner.seasonElo : 400
    loserSeasonElo = loser.latestSeasonId === currentSeason?.id ? loser.seasonElo : 400

    // TODO fix types: (winnerSeasonGames and loserSeasonGames are non-null when currentSeason is non-null)
    const [winnerEloChange, loserEloChange] = getScoreChange(
      winnerSeasonElo,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      winnerSeasonGames!,
      loserSeasonElo,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      loserSeasonGames!
    )

    winnerSeasonEloAfter = winnerSeasonElo + winnerEloChange
    loserSeasonEloAfter = loserSeasonElo + loserEloChange
  }

  // ------------------------
  const createdGameObject = {
    winnerId: gameInfo.winnerId,
    winnerEloBefore: winner.elo,
    winnerEloAfter,
    winnerSeasonEloBefore: winnerSeasonElo,
    winnerSeasonEloAfter: winnerSeasonEloAfter,

    loserId: gameInfo.loserId,
    loserEloBefore: loser.elo,
    loserEloAfter,
    loserSeasonEloBefore: loserSeasonElo,
    loserSeasonEloAfter: loserSeasonEloAfter,

    underTable: gameInfo.underTable,
    seasonId: currentSeason?.id ?? null,
  }

  const winnerUpdateInfo = {
    elo: winnerEloAfter,
    latestSeasonId: currentSeason?.id ?? null,
    seasonElo: winnerSeasonEloAfter,
  }
  const loserUpdateInfo = {
    elo: loserEloAfter,
    latestSeasonId: currentSeason?.id ?? null,
    seasonElo: loserSeasonEloAfter,
  }
  return { createdGameObject, winnerUpdateInfo, loserUpdateInfo }
}

const removeLatestGame = async (): Promise<GameModel> => {
  const latest = await GameModel.findOne({
    order: [['createdAt', 'DESC']],
  })

  const winnerLatest = await GameModel.findOne({
    where: {
      [Op.and]: [{ winnerId: latest?.winnerId }, { seasonId: { [Op.ne]: null } }],
    },
    order: [['createdAt', 'DESC']],
  })

  const loserLatest = await GameModel.findOne({
    where: {
      [Op.and]: [{ loserId: latest?.loserId }, { seasonId: { [Op.ne]: null } }],
    },
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
    updatePlayerById(latest.winnerId, {
      elo: latest.winnerEloBefore,
      seasonElo: latest.winnerSeasonEloBefore <= 0 ? 400 : latest.winnerSeasonEloBefore,
      latestSeasonId: winnerLatest?.seasonId ?? null,
    }),
    updatePlayerById(latest.loserId, {
      elo: latest.loserEloBefore,
      seasonElo: latest.loserSeasonEloBefore,
      latestSeasonId: loserLatest?.seasonId ?? null,
    }),
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
