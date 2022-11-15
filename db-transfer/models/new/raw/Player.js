import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db.js";

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
    motto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "player",
    defaultScope: {
      attributes: {
        exclude: ["createdAt"],
      },
    },
    hooks: {
      async afterCreate(attrs) {
        await attrs.reload();
      },
    },
  }
);

export default Player;
