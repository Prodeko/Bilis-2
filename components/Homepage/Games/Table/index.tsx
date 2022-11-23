import { RecentGame } from '@common/types'
import { Dispatch, SetStateAction } from 'react'
import styles from './Table.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

interface Props {
  games: RecentGame[]
  setGames: Dispatch<SetStateAction<RecentGame[]>>
}
const Table = ({ games, setGames }: Props) => {
  return (
    <table className={styles.table}>
      <TableHead />
      <TableBody games={games} setGames={setGames} />
    </table>
  )
}

export default Table
