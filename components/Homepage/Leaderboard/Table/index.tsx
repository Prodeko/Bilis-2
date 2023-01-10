import type { Player } from '@common/types'

import styles from './Table.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

const Table = ({ leaderboard }: { leaderboard: Player[] }) => {
  return (
    <div className={styles.table}>
      <TableHead />
      <TableBody leaderboard={leaderboard} />
    </div>
  )
}

export default Table
