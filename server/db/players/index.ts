import _ from 'lodash'
import { Op, Sequelize } from 'sequelize'

import { NewPlayer, Player, newPlayer } from '@common/types'
import { permutator } from '@common/utils/helperFunctions'
import { PlayerModel } from '@server/models'
import dbConf from '@server/utils/dbConf'

const createPlayer = async (player: NewPlayer): Promise<PlayerModel> => {
  const parsedPlayer = newPlayer.parse(player)
  const newPlayerWithElo = {
    ...parsedPlayer,
    elo: 400,
  }
  const createdPlayer = await PlayerModel.create(newPlayerWithElo)
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

const updatePlayerById = async (id: number, data: Partial<Player>): Promise<PlayerModel> => {
  const player = await getPlayerById(id)
  if (!player) throw Error(`Player with id ${id} not found`)
  if ('id' in data) throw Error('Updating player id is not allowed')
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

const getLatestPlayers = async (nofPlayers: number): Promise<PlayerModel[]> => {
  return PlayerModel.findAll({
    where: {
      id: {
        [Op.in]: Sequelize.literal(
          `(
          SELECT p1.id
          FROM players AS p1
          LEFT JOIN games
          ON p1.id = games.winner_id OR p1.id = games.loser_id
          GROUP BY p1.id
          ORDER BY MAX(games.created_at) DESC
          LIMIT ${nofPlayers}
          )`
        ),
      },
    },
  })
}

const searchPlayers = async (query: string, limit?: number): Promise<PlayerModel[]> => {
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
  return players
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
