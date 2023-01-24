import { round } from 'lodash'
import Link from 'next/link'
import { SlArrowRight } from 'react-icons/sl'

import { RecentGame } from '@common/types'

import styles from './Table.module.scss'

interface Props {
  game: RecentGame
  pulsing: boolean
}

const RecentsRow = ({ game, pulsing }: Props) => {
  return (
    <div className={pulsing ? styles.row__last : styles.row__game}>
      <span className={styles.time}>
        <span>{game.time}</span>
        <span>{game.underTable && '💩'}</span>
      </span>
      <span className={styles.winner}>
        <Link href={`/player/${game.winnerId}`}>
          <span className={styles.link}>{game.winner}</span>
        </Link>
      </span>
      <span className={styles.winnerEloChange}>
        <span>{round(game.winnerEloBefore)}</span>
        <span className={styles.chevron}>
          <SlArrowRight />
        </span>
        <span>{round(game.winnerEloAfter)}</span>
      </span>
      <span className={styles.loser}>
        <Link href={`/player/${game.loserId}`}>
          <span className={styles.link}>{game.loser}</span>
        </Link>
      </span>
      <span className={styles.loserEloChange}>
        <span>{round(game.loserEloBefore)}</span>
        <span className={styles.chevron}>
          <SlArrowRight />
        </span>
        <span>{round(game.loserEloAfter)}</span>
      </span>
    </div>
  )
}

export default RecentsRow
