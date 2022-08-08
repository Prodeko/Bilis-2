import { Game, Player } from '@server/models'
import { NewGame, NewPlayer } from '@common/types'

const createGame = async (game: NewGame) => {
  const createdGame = await Game.create(game)
  return createdGame
}

const createPlayer = async (player: NewPlayer) => {
  const createdPlayer = await Player.create(player)
  return createdPlayer
}

const clearPlayersDEV = () =>
  Player.destroy({
    where: {},
    truncate: true,
  })

const getPlayers = async () => {
  const players = await Player.findAll({
    order: [['elo', 'DESC']],
  })
  return players.map(p => p.getPlayer())
}

export { getPlayers, createPlayer, createGame, clearPlayersDEV }
