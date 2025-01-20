const { DataTypes, Model } = require("sequelize");
const { newSequelize } = require("../../../config/db.js");

class Game extends Model {}

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
    sequelize: newSequelize,
    underscored: true,
    timestamps: true,
    updatedAt: false,
    modelName: "game",
    hooks: {
      async afterCreate(attrs) {
        await attrs.reload();
      },
    },
  },
);

module.exports = { Game };
