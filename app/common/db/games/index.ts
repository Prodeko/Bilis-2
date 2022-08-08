import { NewGame } from '@common/types'
import { Game } from '@server/models'

const createGame = async (game: NewGame) => {
  const createdGame = await Game.create(game)
  return createdGame
}

export { createGame }
