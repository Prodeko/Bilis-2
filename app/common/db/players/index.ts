import { Player } from '@server/models'
import { NewPlayer } from '@common/types'

const createPlayer = async (player: NewPlayer) => {
  const createdPlayer = await Player.create(player)
  return createdPlayer
}

const getPlayerById = async (id: number) => Player.findByPk(id)

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

export { getPlayers, createPlayer, clearPlayersDEV, getPlayerById }
