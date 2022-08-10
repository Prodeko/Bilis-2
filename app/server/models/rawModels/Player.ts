import { Model, DataTypes } from 'sequelize'
import { Player as PlayerType } from '@common/types'
import dbConf from '@server/utils/dbConf'

class Player extends Model {
  declare id: number

  declare firstName: string

  declare lastName: string

  declare nickname: string

  declare emoji: string

  declare elo: number
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    elo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: dbConf.sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'player',
    defaultScope: {
      attributes: {
        exclude: ['createdAt'],
      },
    },
    hooks: {
      async afterCreate(attrs) {
        await attrs.reload()
      },
    },
  }
)

export default Player
