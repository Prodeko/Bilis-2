import { RecentGame } from '@common/types'
import styles from './Table.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

const Table = ({ games }: { games: RecentGame[] }) => {
  return (
    <table className={styles.table}>
      <TableHead />
      <TableBody games={games} />
    </table>
  )
}

export default Table
