import Sequelize from "sequelize";
import type { MigrationFn } from "umzug";

export const up: MigrationFn<Sequelize.QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.addColumn("players", "nickname", {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  });
};

export const down: MigrationFn<Sequelize.QueryInterface> = async ({
  context: queryInterface,
}) => {
  await queryInterface.removeColumn("players", "nickname");
};
