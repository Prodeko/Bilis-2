import Sequelize from 'sequelize'
import { MigrationFn } from 'umzug'

export const up: MigrationFn<Sequelize.QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('games', 'winner_season_elo_after', {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  })

  await queryInterface.addColumn('games', 'winner_season_elo_before', {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  })

  await queryInterface.addColumn('games', 'loser_season_elo_after', {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  })

  await queryInterface.addColumn('games', 'loser_season_elo_before', {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: null,
  })

  await queryInterface.addColumn('players', 'season_elo', {
    type: Sequelize.DOUBLE,
    allowNull: true,
    defaultValue: null,
  })

  await queryInterface.createTable('seasons', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    start: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    end: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
    created_at: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    },
  })
}
export const down: MigrationFn<Sequelize.QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('games', 'winner_season_elo_after')
  await queryInterface.removeColumn('games', 'winner_season_elo_before')
  await queryInterface.removeColumn('games', 'loser_season_elo_after')
  await queryInterface.removeColumn('games', 'loser_season_elo_before')

  await queryInterface.removeColumn('players', 'season_elo')

  await queryInterface.dropTable('seasons')
}
