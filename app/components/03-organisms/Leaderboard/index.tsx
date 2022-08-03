import type { HomeLeaderboard } from '@common/types'
import styles from './Leaderboard.module.scss'

interface Props {
  leaderboard: HomeLeaderboard
}

const Leaderboard = ({ leaderboard }: Props): JSX.Element => {
  return (
    <div className={styles.leaderboard}>
      <h2 className={styles.title}>All time leaderboard</h2>
      <table className={styles.keepHeight}>
        <thead className={`${styles.leaderboardHeader}`}>
          <th className={styles.leaderboardCardInfo}>
            <p className={styles.tableItem}>Position</p>
            <p className={styles.tableItem}>Name</p>
          </th>
          <th className={styles.leaderboardCardStats}>
            <p className={styles.tableItem}>Elo</p>
          </th>
        </thead>
        <tbody className={styles.scroll}>
          {leaderboard.map(item => (
            <tr key={item.position} className={styles.leaderboardCard}>
              <td className={styles.leaderboardCardInfo}>
                <p className={styles.tableItem}>{item.position}.</p>
                <p className={styles.tableItem}>
                  {item.emoji} {item.name}
                </p>
              </td>
              <td className={styles.leaderboardCardStats}>
                <p className={styles.tableItem}>{item.points}</p>
              </td>
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
