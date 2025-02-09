const Sequelize = require("sequelize");

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable("games", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    winner_id: {
      type: Sequelize.INTEGER,
      references: { model: "players", key: "id" },
      allowNull: false,
    },
    loser_id: {
      type: Sequelize.INTEGER,
      references: { model: "players", key: "id" },
      allowNull: false,
    },
    winner_elo_before: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    loser_elo_before: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    winner_elo_after: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    loser_elo_after: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    under_table: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("games");
};

module.exports = {
  up,
  down,
};
