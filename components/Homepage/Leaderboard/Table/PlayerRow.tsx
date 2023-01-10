import { round } from 'lodash'
import Link from 'next/link'

import type { Player } from '@common/types'
import { formatFullName } from '@common/utils/helperFunctions'

import styles from './Table.module.scss'

interface Props {
  player: Player
  position: number
}

const PlayerRow = ({ player, position }: Props) => {
  return (
    <Link className={styles['row__player']} href={`/player/${player.id}`}>
      <span className={styles.position}>{position}.</span>
      <span className={styles.player}>
        {player.emoji} {formatFullName(player)}
      </span>
      <span className={styles.elo}>{round(player.elo)}</span>
    </Link>
  )
}

export default PlayerRow
