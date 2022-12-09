import { Op } from 'sequelize'

import type {
  GameWithPlayers,
  NewGame,
  PlayerStats,
  MutualGames,
  TimeSeriesGame,
  RecentGame,
} from '@common/types'
import { ZEROTH_GAME } from '@common/utils/constants'
import { getScoreChange } from '@common/utils/gameStats'
import { getPlayerById, updatePlayerById } from '@server/db/players'
import { Game, Player } from '@server/models'

const getGameCountForPlayer = async (playerId: number) => {
  return Game.count({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
  })
}

const getPlayerStats = async (playerId: number): Promise<PlayerStats> => {
  const games = await Game.findAll({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
    order: [['createdAt', 'ASC']],
  })

  const totalGames = games.length
  const wonGames = games.filter(game => game.winnerId === playerId).length
  const lostGames = totalGames - wonGames
  const winPercentage = totalGames === 0 ? 0 : (wonGames / totalGames) * 100

  return {
    wonGames,
    lostGames,
    totalGames,
    winPercentage,
  }
}

const getPlayerDetailedGames = async (playerId: number) => {
  const games = await Game.findAll({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
    include: [
      {
        model: Player,
        as: 'winner',
      },
      {
        model: Player,
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
  // console.log(playedGames)
  const gameData = [ZEROTH_GAME, ...playedGames]

  return gameData
}

const getMutualGamesCount = async (
  currentPlayerId: number,
  opposingPlayerId: number
): Promise<MutualGames> => {
  const [currentPlayerGamesWon, opposingPlayerGamesWon] = await Promise.all([
    Game.count({
      where: {
        winnerId: currentPlayerId,
        loserId: opposingPlayerId,
      },
    }),
    Game.count({
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
  const { rows: games } = await Game.findAndCountAll({
    order: [['createdAt', 'DESC']],
    include: [
      { model: Player, as: 'winner' },
      { model: Player, as: 'loser' },
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
  id: game.id,
  time: new Date(game.createdAt).toLocaleDateString('fi-FI', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  }),
  winner: `${game.winner.firstName} ${game.winner.lastName}`,
  winnerEloChange: `${Math.round(game.winnerEloBefore)} » ${Math.round(game.winnerEloAfter)}`,
  loser: `${game.loser.firstName} ${game.loser.lastName}`,
  loserEloChange: `${Math.round(game.loserEloBefore)} » ${Math.round(game.loserEloAfter)}`,
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
    await Game.create(
      {
        ...game,
        winnerEloAfter,
        loserEloAfter,
        winnerEloBefore: winner.elo,
        loserEloBefore: loser.elo,
      },
      {
        include: [
          { model: Player, as: 'winner' },
          { model: Player, as: 'loser' },
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
  const latest = await Game.findOne({
    order: [['createdAt', 'DESC']],
  })

  if (!latest) throw Error('No games in database')

  const removeLatestPromise = await Promise.all([
    updatePlayerById(latest.winnerId, { elo: latest.winnerEloBefore }),
    updatePlayerById(latest.loserId, { elo: latest.loserEloBefore }),
    Game.destroy({
      where: {
        id: latest.id,
      },
    }),
  ])

  return latest
}

// NOTE!! Only use in dev, destroys everything in database
const clearGamesDEV = () =>
  Game.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })

export {
  removeLatestGame,
  createGame,
  getGameCountForPlayer,
  getPlayerStats,
  getLatestGames,
  clearGamesDEV,
  getRecentGames,
  getMutualGamesCount,
  getPlayerDetailedGames,
}
