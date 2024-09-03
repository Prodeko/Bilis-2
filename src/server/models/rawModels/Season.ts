import { DataTypes, Model } from 'sequelize'

import dbConf from '@server/utils/dbConf'

class Season extends Model {
  declare id: number

  declare start: Date

  declare end: Date

  declare name: string

  declare createdAt: Date
}

Season.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: dbConf.sequelize,
    underscored: true,
    timestamps: true,
    updatedAt: false,
    modelName: 'season',
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

export default Season
