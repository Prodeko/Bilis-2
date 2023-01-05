import { round } from 'lodash'
import Link from 'next/link'

import type { PlayerExtended } from '@common/types'

import styles from './Table.module.scss'

interface Props {
  player: PlayerExtended
  position: number
}

const PlayerRow = ({ player, position }: Props) => {
  return (
    <Link className={styles['row__player']} href={`/player/${player.id}`}>
      <span className={styles.position}>{position}.</span>
      <span className={styles.player}>
        {player.emoji} {player.fullName}
      </span>
      <span className={styles.elo}>{round(player.elo)}</span>
    </Link>
  )
}

export default PlayerRow
