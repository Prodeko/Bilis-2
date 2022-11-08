import { Op } from 'sequelize'

import type { GameWithPlayers, NewGame, PlayerStats, MutualGames } from '@common/types'
import { DEFAULT_ELO } from '@common/utils/constants'
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
  const jsonGames = games.map(game => game.toJSON()) as GameWithPlayers[]

  const totalGames = jsonGames.length
  const wonGames = jsonGames.filter(game => game.winnerId === playerId).length
  const lostGames = totalGames - wonGames
  const winPercentage = totalGames === 0 ? 0 : (wonGames / totalGames) * 100

  const pickElo = (game: GameWithPlayers) =>
    game.winnerId === playerId ? game.winnerEloAfter : game.loserEloAfter
  const eloData = [DEFAULT_ELO, ...jsonGames.map(pickElo)] // Everybody starts from 400 elo

  return {
    wonGames,
    lostGames,
    totalGames,
    winPercentage,
    eloData,
  }
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

const getLatestGames = async (n = 20): Promise<GameWithPlayers[]> => {
  const games = await Game.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      { model: Player, as: 'winner' },
      { model: Player, as: 'loser' },
    ],
    limit: n,
  })

  const jsonGames = games.map(g => g.toJSON()) as GameWithPlayers[]
  return jsonGames
}

const getRecentGames = async (n = 20) => {
  const recentGames = await getLatestGames(n)

  return recentGames.map(game => ({
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
  }))
}

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
  const createdGame = await Game.create({
    ...game,
    winnerEloAfter,
    loserEloAfter,
    winnerEloBefore: winner.elo,
    loserEloBefore: loser.elo,
  })
  await Promise.all([
    updatePlayerById(winner.id, { elo: winnerEloAfter }),
    updatePlayerById(loser.id, { elo: loserEloAfter }),
  ])
  return createdGame
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
}
