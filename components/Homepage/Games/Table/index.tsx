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
    <div className={styles.table}>
      <TableHead />
      <TableBody games={games} setGames={setGames} visible={visible} />
    </div>
  )
}

export default Table
