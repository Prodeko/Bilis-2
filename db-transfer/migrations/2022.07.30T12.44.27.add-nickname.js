const Sequelize = require("sequelize");

const up = async ({ context: queryInterface }) => {
  await queryInterface.addColumn("players", "nickname", {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "",
  });
};

const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("players", "nickname");
};

module.exports = {
  up,
  down,
};
