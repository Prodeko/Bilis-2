const { DataTypes, Model } = require('sequelize')
const { oldSequelize } = require('../../../config/db.js')

class Game extends Model {}

Game.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    winnerFargo: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    loserFargo: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    underTable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: oldSequelize,
    underscored: true,
    timestamps: false,
    updatedAt: false,
    modelName: 'game',
    tableName: 'bilis_game',
    hooks: {
      async afterCreate(attrs) {
        await attrs.reload()
      },
    },
  }
)

module.exports = { Game }
