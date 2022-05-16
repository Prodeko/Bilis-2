import { MigrationFn } from 'umzug'
import Sequelize from 'sequelize'

export const up: MigrationFn<Sequelize.QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('players', 'nickname', {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  })
}

export const down: MigrationFn<Sequelize.QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('players', 'nickname')
}
