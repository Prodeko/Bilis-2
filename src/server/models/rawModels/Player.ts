import { DataTypes, Model } from "sequelize";

import dbConf from "@server/utils/dbConf";

class Player extends Model {
  declare id: number;

  declare firstName: string;

  declare lastName: string;

  declare nickname: string;

  declare emoji: string;

  declare motto: string;

  declare elo: number;

  declare seasonElo: number;

  declare latestSeasonId: number;

  declare createdAt: Date;

  declare updatedAt: Date;
}

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
    seasonElo: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      defaultValue: null,
    },
    latestSeasonId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
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
    sequelize: dbConf.sequelize,
    underscored: true,
    timestamps: true,
    modelName: "player",
    hooks: {
      async afterCreate(attrs) {
        await attrs.reload();
      },
    },
  },
);

export default Player;
