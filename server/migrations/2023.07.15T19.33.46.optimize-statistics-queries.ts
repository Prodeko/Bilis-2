import Sequelize from 'sequelize'
import { MigrationFn } from 'umzug'

export const up: MigrationFn<Sequelize.QueryInterface> = async ({ context: queryInterface }) => {
  const winnerIdIdx = queryInterface.addIndex('games', ['winner_id'], {
    using: 'BTREE',
    name: 'games_winner_id_idx',
  })

  const loserIdIdx = queryInterface.addIndex('games', ['loser_id'], {
    using: 'BTREE',
    name: 'games_loser_id_idx',
  })

  const createdAtIdx = queryInterface.addIndex('games', ['created_at'], {
    using: 'BRIN',
    name: 'games_created_at_idx',
  })

  await Promise.all([winnerIdIdx, loserIdIdx, createdAtIdx])
}

export const down: MigrationFn<Sequelize.QueryInterface> = async ({ context: queryInterface }) => {
  const winnerIdIdx = queryInterface.removeIndex('games', ['winner_id'], {
    using: 'BTREE',
    name: 'games_winner_id_idx',
  })

  const loserIdIdx = queryInterface.removeIndex('games', ['loser_id'], {
    using: 'BTREE',
    name: 'games_loser_id_idx',
  })

  const createdAtIdx = queryInterface.removeIndex('games', ['created_at'], {
    using: 'BRIN',
    name: 'games_created_at_idx',
  })

  await Promise.all([winnerIdIdx, loserIdIdx, createdAtIdx])
}
