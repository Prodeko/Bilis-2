import _ from 'lodash'
import { Op, Sequelize } from 'sequelize'

import { NewPlayer, PlayerExtended, Player as PlayerType, PlayerWithStats } from '@common/types'
import { getLatestGames, getPlayerStats } from '@server/db/games'
import { Player } from '@server/models'
import dbConf from '@server/utils/dbConf'
import type { Col } from 'sequelize/types/utils'
import { permutator } from '@common/utils/helperFunctions'

const createPlayer = async (player: NewPlayer) => {
  // Ghetto validation
  const validateAndFormatPlayer = (p: NewPlayer): NewPlayer => {
    if (
      p.firstName.length > 0 &&
      p.lastName.length > 0 &&
      p.nickname.length > 0 &&
      p.emoji.length > 0 &&
      p.motto.length > 0
    ) {
      return { ...p, elo: 400 }
    }
    throw new Error('Malformmated id!')
  }

  const createdPlayer = await Player.create(validateAndFormatPlayer(player))
  return createdPlayer
}

const getPlayerById = async (id: number) => Player.findByPk(id)

const getRandomPlayer = async () =>
  Player.findOne({
    order: dbConf.sequelize.random(),
    where: {
      motto: {
        [Op.ne]: '',
      },
    },
  })

const extendPlayerWithStats = async (p: Player | PlayerType) => {
  const playerStats = await getPlayerStats(p.id)
  return { ...p, ...playerStats }
}

const updatePlayerById = async (id: number, data: Partial<NewPlayer>) => {
  const player = await getPlayerById(id)
  if (!player) throw Error(`Player with id ${id} not found`)
  const updated = await player.update(data)
  return updated
}

// NOTE!! Only use in dev, destroys everything in database
const clearPlayersDEV = () =>
  Player.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })

const getPlayers = async (amount: number | undefined = undefined): Promise<PlayerExtended[]> => {
  const players = await Player.findAll({
    limit: amount,
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
  const sliced = uniquePlayers.slice(0, n)
  const extended = await Promise.all(sliced.map(extendPlayerWithStats))
  return extended
}

const searchPlayers = async (
  query: string,
  stats: boolean = false,
  limit?: number
): Promise<Player[] | PlayerWithStats[]> => {
  const colOptions = ['first_name', 'last_name', 'nickname', 'id']
  const permutations = permutator(colOptions)

  const options = permutations.map(perm => {
    return Sequelize.where(Sequelize.fn('concat', ...perm.map(col => Sequelize.col(col))), {
      [Op.iLike]: `%${query.replaceAll(' ', '%')}%`,
    })
  })

  const players = await Player.findAll({
    where: { [Op.or]: options },
    limit: limit,
  })
  const jsonPlayers = players.map(p => p.toJSON())

  if (!stats) return jsonPlayers

  const extendedPlayers = await Promise.all(jsonPlayers.map(extendPlayerWithStats))
  return extendedPlayers
}

export {
  getPlayers,
  createPlayer,
  clearPlayersDEV,
  getPlayerById,
  getRandomPlayer,
  updatePlayerById,
  getLatestPlayers,
  searchPlayers,
}
