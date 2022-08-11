import type { HomeLeaderboard } from '@common/types'
import { round } from 'lodash'
import styles from './Leaderboard.module.scss'

interface Props {
  leaderboard: HomeLeaderboard
}

const Leaderboard = ({ leaderboard }: Props): JSX.Element => {
  return (
    <div className={styles.leaderboard}>
      <h2 className={styles.title}>All time leaderboard</h2>
      <table className={styles.keepHeight}>
        <thead>
          <tr className={`${styles.leaderboardHeader}`}>
            <div className={styles.leaderboardCardInfo}>
              <th className={styles.tableItem}>Position</th>
              <th className={styles.tableItem}>Name</th>
            </div>
            <div className={styles.leaderboardCardStats}>
              <th className={styles.tableItem}>Elo</th>
            </div>
          </tr>
        </thead>
        <tbody className={styles.scroll}>
          {leaderboard.map((item, index) => (
            <tr key={item.id} className={styles.leaderboardCard}>
              <div className={styles.leaderboardCardInfo}>
                <td className={styles.tableItem}>{index + 1}.</td>
                <td className={styles.tableItem}>
                  {item.emoji} {`${item.firstName} ${item.lastName}`}
                </td>
              </div>
              <div className={styles.leaderboardCardStats}>
                <td className={styles.tableItem}>{round(item.elo)}</td>
              </div>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch('/leaderboard')
  const leaderboard = await res.json()
  return { props: { leaderboard } }
}

export default Leaderboard
