import Sequelize from 'sequelize'
import { MigrationFn } from 'umzug'

export const up: MigrationFn<Sequelize.QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.addColumn('players', 'motto', {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  })
}

export const down: MigrationFn<Sequelize.QueryInterface> = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('players', 'motto')
}
