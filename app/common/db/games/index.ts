import { NewGame } from '@common/types'
import { Game } from '@server/models'
import { getPlayerById } from '@common/db/players'
import { getScoreChange } from '@common/utils/gameStats'
import { Op } from 'sequelize'

const getGameCountForPlayer = async (playerId: number) => {
  return Game.count({
    where: {
      [Op.or]: [{ winnerId: playerId }, { loserId: playerId }],
    },
  })
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
  const createdGame = await Game.create({
    ...game,
    winnerEloAfter: winner.elo + winnerEloChange,
    loserEloAfter: loser.elo + loserEloChange,
    winnerEloBefore: winner.elo,
    loserEloBefore: loser.elo,
  })
  return createdGame
}

export { createGame }
