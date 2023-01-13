import _ from 'lodash'
import { Op, Sequelize } from 'sequelize'

import { NewPlayer, Player, PlayerWithStats } from '@common/types'
import { permutator } from '@common/utils/helperFunctions'
import { getLatestGames, getPlayerStats } from '@server/db/games'
import { GameModel, PlayerModel } from '@server/models'
import dbConf from '@server/utils/dbConf'

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

  const createdPlayer = await PlayerModel.create(validateAndFormatPlayer(player))
  return createdPlayer
}

const getPlayerById = async (id: number): Promise<PlayerModel | null> => PlayerModel.findByPk(id)

const getRandomPlayer = (): Promise<PlayerModel | null> =>
  PlayerModel.findOne({
    order: dbConf.sequelize.random(),
    where: {
      motto: {
        [Op.ne]: '',
      },
    },
  })

const extendPlayerWithStats = async (p: PlayerModel | Player) => {
  const playerStats = await getPlayerStats(p.id)
  return { ...p, ...playerStats }
}

const updatePlayerById = async (id: number, data: Partial<NewPlayer>): Promise<PlayerModel> => {
  const player = await getPlayerById(id)
  if (!player) throw Error(`Player with id ${id} not found`)
  const updated = await player.update(data)
  return updated
}

//WARNING!! Only use in dev, destroys everything in database
const clearPlayersDEV = () =>
  PlayerModel.destroy({
    where: {},
    truncate: true,
    cascade: true,
  })

const getPlayers = (amount?: number): Promise<PlayerModel[]> =>
  PlayerModel.findAll({
    limit: amount,
    order: [['elo', 'DESC']],
  })

const getLatestPlayers = async (n = 20): Promise<Player[]> => {
  // Get > n games since the games likely contain duplicate players
  const latestGames = await getLatestGames(n * 5)
  const players = latestGames.reduce(
    (playerAccumulator: Player[], game) => [...playerAccumulator, game.winner, game.loser],
    []
  )
  const uniquePlayers = _.uniqBy(players, pl => pl.id)
  const sliced = uniquePlayers.slice(0, n)
  return sliced
}

const searchPlayers = async (
  query: string,
  stats = false,
  limit?: number
): Promise<Player[] | PlayerWithStats[]> => {
  const colOptions = ['first_name', 'last_name', 'nickname', 'id']
  const permutations = permutator(colOptions)

  const options = permutations.map(perm => {
    return Sequelize.where(Sequelize.fn('concat', ...perm.map(col => Sequelize.col(col))), {
      [Op.iLike]: `%${query.replaceAll(' ', '%')}%`,
    })
  })

  const players = await PlayerModel.findAll({
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
