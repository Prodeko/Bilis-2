import type { HomeLeaderboard } from '@common/types'

import PlayerRow from './PlayerRow'
import styles from './Table.module.scss'

const TableBody = ({ leaderboard }: { leaderboard: HomeLeaderboard }) => {
  return (
    <div className={styles.tablebody}>
      {leaderboard.map((player, position) => {
        return <PlayerRow key={player.id} player={player} position={position + 1} />
      })}
    </div>
  )
}

export default TableBody
