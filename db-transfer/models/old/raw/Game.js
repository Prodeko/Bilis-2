import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/db.js";

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
    sequelize,
    underscored: true,
    timestamps: true,
    updatedAt: false,
    modelName: "bilis_game",
    hooks: {
      async afterCreate(attrs) {
        await attrs.reload();
      },
    },
  }
);

export default Game;
