import { GameWithPlayers, NewGame } from '@common/types'
import { Game, Player } from '@server/models'
import { getPlayerById, updatePlayerById } from '@common/db/players'
import { getScoreChange } from '@common/utils/gameStats'
import { Op } from 'sequelize'

const getGameCountForPlayer = async (playerId: number) => {
  return await Game.count({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
  })
}

const getWinGameCountForPlayer = async (playerId: number) => {
  return await Game.count({
    where: {
      winnerId: playerId,
    },
  })
}

const getLatestGames = async (n=20): Promise<GameWithPlayers[]> => {
  const games = await Game.findAll({
    order: [['createdAt', 'DESC']],
    include: [
      {model: Player, as: "winner"},
      {model: Player, as: "loser"}
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
    where: {}
  })

export { createGame, getGameCountForPlayer, getWinGameCountForPlayer, getLatestGames, clearGamesDEV }
