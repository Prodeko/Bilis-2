const Sequelize = require('sequelize')

const up = async ({ context: queryInterface }) => {
  await queryInterface.createTable('players', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    last_name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    elo: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    emoji: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '🥵',
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  })
}

const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('players')
}

module.exports = {
  up,
  down,
}
