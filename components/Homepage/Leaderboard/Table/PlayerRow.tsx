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
    <Link href={`/player/${player.id}`}>
      <a>
        <tr className={styles['row__player']}>
          <td className={styles.position}>{position}.</td>
          <td className={styles.player}>
            {player.emoji} {player.fullName}
          </td>
          <td className={styles.elo}>{round(player.elo)}</td>
        </tr>
      </a>
    </Link>
  )
}

export default PlayerRow
