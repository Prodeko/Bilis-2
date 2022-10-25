import styles from './Table.module.scss'
import RecentsRow from './RecentsRow'
import { RecentGame } from '@common/types'

const TableBody = ({ recentGames }: { recentGames: RecentGame[] }) => {
  return (
    <tbody className={styles.tablebody}>
      {recentGames.map(game => {
        return <RecentsRow key={game.id} game={game} />
      })}
    </tbody>
  )
}

export default TableBody
