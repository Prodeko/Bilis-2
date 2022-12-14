import { Dispatch, SetStateAction } from 'react'

import { RecentGame } from '@common/types'

import styles from './Table.module.scss'
import TableBody from './TableBody'
import TableHead from './TableHead'

interface Props {
  games: RecentGame[]
  setGames: Dispatch<SetStateAction<RecentGame[]>>
  visible: boolean
}
const Table = ({ games, setGames, visible }: Props) => {
  return (
    <table className={styles.table}>
      <TableHead />
      <TableBody games={games} setGames={setGames} visible={visible} />
    </table>
  )
}

export default Table
