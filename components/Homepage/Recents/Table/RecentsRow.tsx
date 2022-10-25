import { RecentGame } from '@common/types'
import styles from './Table.module.scss'

const RecentsRow = ({ game }: { game: RecentGame }) => {
  return (
    <tr className={styles['row__game']}>
      <td className={styles.time}>{game.time}</td>
      <td className={styles.winner}>{game.winner}</td>
      <td className={styles.winnerEloChange}>{game.winnerEloChange}</td>
      <td className={styles.loser}>{game.loser}</td>
      <td className={styles.loserEloChange}>{game.loserEloChange}</td>
    </tr>
  )
}

export default RecentsRow
