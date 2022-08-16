import { Player } from '@server/models'
import { NewPlayer, PlayerExtended } from '@common/types'

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

const getPlayers = async (): Promise<PlayerExtended[]> => {
  const players = await Player.findAll({
    order: [['elo', 'DESC']],
  })

  const jsonPlayers = players.map(p => p.toJSON())

  // Add position
  const extendedPlayers: PlayerExtended[] = jsonPlayers.map((player, index) => {
    return {
      ...player,
      position: index + 1,
      fullName: `${player.firstName} ${player.lastName}`,
    }
  })

  return extendedPlayers
}

export { getPlayers, createPlayer, clearPlayersDEV, getPlayerById }
