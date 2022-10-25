import { MigrationFn } from 'umzug'
import Sequelize from 'sequelize'

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
