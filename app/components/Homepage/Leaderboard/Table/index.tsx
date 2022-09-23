import type { HomeLeaderboard } from '@common/types'
import styles from './Table.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

const Table = ({ leaderboard }: { leaderboard: HomeLeaderboard }) => {
  return (
    <table className={styles.table}>
      <TableHead />
      <TableBody leaderboard={leaderboard} />
    </table>
  )
}

export default Table
