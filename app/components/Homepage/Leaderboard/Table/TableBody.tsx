import styles from './Table.module.scss'
import PlayerRow from './PlayerRow'
import type { HomeLeaderboard } from '@common/types'

const TableBody = ({ leaderboard }: { leaderboard: HomeLeaderboard }) => {
  return (
    <tbody className={styles.tablebody}>
      {leaderboard.map((player, position) => {
        return <PlayerRow key={player.id} player={player} position={position + 1} />
      })}
    </tbody>
  )
}

export default TableBody
