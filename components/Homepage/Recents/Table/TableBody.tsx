import styles from './Table.module.scss'
import RecentsRow from './RecentsRow'
import { RecentGame } from '@common/types'
import { useAutoAnimate } from '@formkit/auto-animate/react'

const TableBody = ({ recentGames }: { recentGames: RecentGame[] }) => {
  const [parent, _enableAnimations] = useAutoAnimate<HTMLTableSectionElement>()
  return (
    <tbody ref={parent} className={styles.tablebody}>
      {recentGames.map(game => {
        return <RecentsRow key={game.id} game={game} />
      })}
    </tbody>
  )
}

export default TableBody
