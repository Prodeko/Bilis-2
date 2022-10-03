import type { PlayerStats, GameWithPlayers, NewGame } from '@common/types'
import { DEFAULT_ELO } from '@common/utils/constants'
import { Game, Player } from '@server/models'
import { getPlayerById, updatePlayerById } from '@server/db/players'
import { getScoreChange } from '@common/utils/gameStats'
import { Op } from 'sequelize'

const getGameCountForPlayer = async (playerId: number) => {
  return Game.count({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
  })
}

const getWinGameCountForPlayer = async (playerId: number) => {
  return Game.count({
    where: {
      winnerId: playerId,
    },
  })
}

const getPlayerStats = async (playerId: number): Promise<PlayerStats> => {
  const games = await Game.findAll({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
  })
  const jsonGames = games.map(game => game.toJSON()) as GameWithPlayers[]

  const totalGames = jsonGames.length
  const wonGames = jsonGames.filter(game => game.winnerId === playerId).length
  const lostGames = totalGames - wonGames
  const winPercentage = totalGames === 0 ? 0 : (wonGames / totalGames) * 100

  // Helper function to add elos from games
  const pickElo = (game: GameWithPlayers, id: number) =>
    game.winnerId === id ? game.winnerEloAfter : game.loserEloAfter

  const eloData: Array<number> = [DEFAULT_ELO] // Everybody starts from 400 elo
  if (totalGames !== 0) {
    // Avoid 500 errors
    const elos = jsonGames.map(game => pickElo(game, playerId))
    eloData.push(...elos)
  }

  return {
    wonGames,
    lostGames,
    totalGames,
    winPercentage,
    eloData,
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

const clearGamesDEV = () =>
  Game.destroy({
    where: {},
  })

export {
  createGame,
  getGameCountForPlayer,
  getWinGameCountForPlayer,
  getPlayerStats,
  getLatestGames,
  clearGamesDEV,
}
