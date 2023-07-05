import Link from 'next/link'
import { IconType } from 'react-icons'

import { HofPlayer } from '@common/types'
import { formatFullName } from '@common/utils/helperFunctions'

import styles from './HallOfFame.module.scss'

interface Props {
  statName: string
  Icon: IconType
  hofPlayer: HofPlayer
}

export const HallOfFameStatRow = ({ statName, hofPlayer, Icon }: Props) => {
  return (
    <div className={styles.statContainer}>
      <div className={styles.leftContainer}>
        <Icon className={styles.icon} size={40} />
        <div className={styles.statTexts}>
          <Link href={`/player/${hofPlayer.id}`} className={styles.titleHolder}>
            {formatFullName(hofPlayer, false, false)}
          </Link>
          <span className={styles.titleName}>{statName}</span>
        </div>
      </div>
      <span className={styles.statNumber}>{hofPlayer.hofStat}</span>
    </div>
  )
}
