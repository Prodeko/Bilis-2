import { RecentGame } from '@common/types'
import Link from 'next/link'
import { SlArrowRight } from 'react-icons/sl'
import styles from './Table.module.scss'

interface Props {
  game: RecentGame
  pulsing: boolean
}

const RecentsRow = ({ game, pulsing }: Props) => {
  return (
    <tr className={pulsing ? styles.row__last : styles.row__game}>
      <td className={styles.time}>{game.time}</td>
      <td className={styles.winner}>
        <Link href={`/player/${game.winnerId}`}>
          <a>{game.winner}</a>
        </Link>
      </td>
      <td className={styles.winnerEloChange}>
        <span>{game.winnerEloBefore}</span>
        <span className={styles.chevron}>
          <SlArrowRight />
        </span>
        <span>{game.winnerEloAfter}</span>
      </td>
      <td className={styles.loser}>
        <Link href={`/player/${game.loserId}`}>
          <a>{game.loser}</a>
        </Link>
      </td>
      <td className={styles.loserEloChange}>
        <span>{game.loserEloBefore}</span>
        <span className={styles.chevron}>
          <SlArrowRight />
        </span>
        <span>{game.loserEloAfter}</span>
      </td>
    </tr>
  )
}

export default RecentsRow
