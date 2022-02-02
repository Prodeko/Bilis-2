import { Model, DataTypes } from "sequelize";
import dbConf from "../utils/dbConf";

class Player extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare elo: number;
  declare favoriteColor: number;
}

Player.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    elo: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    favoriteColor: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: dbConf.sequelize,
    underscored: true,
    timestamps: true,
    modelName: "player",
  }
);

export default Player;
