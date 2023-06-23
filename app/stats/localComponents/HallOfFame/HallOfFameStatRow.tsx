import { IconType } from 'react-icons'

import { Player } from '@common/types'

import styles from './HallOfFame.module.scss'

interface Props {
  statNumber: number
  statName: string
  Icon: IconType
  player?: Player
}

export const HallOfFameStatRow = ({ statName, statNumber, player, Icon }: Props) => {
  return (
    <div className={styles.statContainer}>
      <div className={styles.leftContainer}>
        <Icon className={styles.icon} size={40} />
        <div className={styles.statTexts}>
          <span className={styles.titleHolder}>Mika Siirilä</span>
          <span className={styles.titleName}>{statName}</span>
        </div>
      </div>
      <span className={styles.statNumber}>{statNumber}</span>
    </div>
  )
}
