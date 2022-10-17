import _ from 'lodash'
import { Op } from 'sequelize'

import { NewPlayer, PlayerExtended, Player as PlayerType } from '@common/types'
import { Player } from '@server/models'

import { getLatestGames } from '../games'

const createPlayer = async (player: NewPlayer) => {
  // Ghetto validation
  const validateAndFormatPlayer = (player: NewPlayer): NewPlayer => {
    if (
      player.firstName.length > 0 &&
      player.lastName.length > 0 &&
      player.nickname.length > 0 &&
      player.emoji.length > 0
    ) {
      return { ...player, elo: 400 }
    } else {
      throw new Error('Malformmated id!')
    }
  }

  const createdPlayer = await Player.create(validateAndFormatPlayer(player))
  return createdPlayer
}

const getPlayerById = async (id: number) => Player.findByPk(id)

const clearPlayersDEV = () =>
  Player.destroy({
    where: {},
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

const getLatestPlayers = async (n = 20) => {
  // Get > n games since the games likely contain duplicate players
  const latestGames = await getLatestGames(n * 5)
  const players = latestGames.reduce((acc: PlayerType[], g) => [...acc, g.winner, g.loser], [])
  const uniquePlayers = _.uniqBy(players, pl => pl.id)
  return uniquePlayers.slice(0, n)
}

const searchPlayers = async (query: string): Promise<Player[]> => {
  const players = await Player.findAll({
    where: {
      [Op.or]: [
        {
          firstName: {
            [Op.iLike]: `%${query}%`,
          },
        },
        {
          lastName: {
            [Op.iLike]: `%${query}%`,
          },
        },
      ],
    },
  })

  const jsonPlayers = players.map(p => p.toJSON())
  return jsonPlayers
}

export { getPlayers, createPlayer, clearPlayersDEV, getPlayerById, getLatestPlayers, searchPlayers }
