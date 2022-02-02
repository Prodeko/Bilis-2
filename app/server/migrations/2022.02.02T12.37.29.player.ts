import Sequelize from "sequelize";
import { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize.QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.createTable("players", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    elo: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    favoriteColor: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
};

export const down: MigrationFn<Sequelize.QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.dropTable("players");
};
