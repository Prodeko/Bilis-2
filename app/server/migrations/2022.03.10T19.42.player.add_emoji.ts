import { MigrationFn } from 'umzug';
import Sequelize from "sequelize";

export const up: MigrationFn<Sequelize.QueryInterface> = async ({
    context: queryInterface,
  }) => {
    await queryInterface.addColumn("players", "emoji", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "&#128525"
    });
  };
  
  export const down: MigrationFn<Sequelize.QueryInterface> = async ({
    context: queryInterface,
  }) => {
    await queryInterface.removeColumn("players", "emoji");
  };
  