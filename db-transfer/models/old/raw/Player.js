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
    fargo: {
      type: DataTypes.DOUBLE,
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
