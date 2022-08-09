import { Player } from '@server/models'
import { NewPlayer, Player as PlayerType } from '@common/types'

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

const getPlayers = async (): Promise<PlayerType[]> => {
  const players = await Player.findAll({
    order: [['elo', 'DESC']],
  })
  return players.map(p => p.toJSON())
}

export { getPlayers, createPlayer, clearPlayersDEV, getPlayerById }
