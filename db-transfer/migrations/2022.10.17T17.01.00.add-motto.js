const Sequelize = require("sequelize");

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("players", "motto", {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("players", "motto");
};

module.exports = {
  up,
  down,
};
