import { RecentGame } from '@common/types'
import styles from './Table.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

const Table = ({ recentGames }: { recentGames: RecentGame[] }) => {
  return (
    <table className={styles.table}>
      <TableHead />
      <TableBody recentGames={recentGames} />
    </table>
  )
}

export default Table
