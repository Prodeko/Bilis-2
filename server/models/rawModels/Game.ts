import { DataTypes, Model } from 'sequelize'

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
    winnerSeasonEloBefore: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    loserSeasonEloBefore: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    winnerSeasonEloAfter: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    loserSeasonEloAfter: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
    },
    seasonId: {
      type: DataTypes.NUMBER,
      allowNull: true,
      defaultValue: null,
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
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
    },
    scopes: {
      // Adds timestamps to the scope
      withTime: {
        attributes: {
          exclude: ['updatedAt'],
        },
      },
    },
    hooks: {
      async afterCreate(attrs) {
        await attrs.reload()
      },
    },
  }
)

export default Game
