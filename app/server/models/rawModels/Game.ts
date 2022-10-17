import { Model, DataTypes } from 'sequelize'
import dbConf from '@server/utils/dbConf'

class Game extends Model {
  declare id: number

  declare winnerEloBefore: number

  declare loserEloBefore: number

  declare winnerEloAfter: number

  declare loserEloAfter: number

  declare underTable: boolean

  declare createdAt: Date
}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    winnerEloBefore: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    loserEloBefore: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    winnerEloAfter: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    loserEloAfter: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    underTable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: dbConf.sequelize,
    underscored: true,
    timestamps: true,
    updatedAt: false,
    modelName: 'game',
    hooks: {
      async afterCreate(attrs) {
        await attrs.reload()
      },
    },
  }
)

export default Game
