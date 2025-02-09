const { DataTypes, Model } = require("sequelize");
const { oldSequelize } = require("../../../config/db.js");

class Player extends Model {}

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
    fargo: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize: oldSequelize,
    underscored: true,
    timestamps: false,
    modelName: "player",
    defaultScope: {
      attributes: {
        exclude: ["createdAt"],
      },
    },
    tableName: "bilis_player",
    hooks: {
      async afterCreate(attrs) {
        await attrs.reload();
      },
    },
  },
);

module.exports = { Player };
