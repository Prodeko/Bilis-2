import type { HomeLeaderboard } from '@common/types'
import HeaderRow from './HeaderRow'
import PlayerRow from './PlayerRow'
import styles from './Table.module.scss'

const Table = ({ leaderboard }: { leaderboard: HomeLeaderboard }) => {
  return (
    <table className={styles.table}>
      <thead>
        <HeaderRow />
      </thead>
      <tbody className={styles.tablebody}>
        {leaderboard.map((player, position) => {
          return <PlayerRow player={player} position={position + 1} />
        })}
      </tbody>
    </table>
  )
}

export default Table
