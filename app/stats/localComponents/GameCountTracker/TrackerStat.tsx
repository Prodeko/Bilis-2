import { ComponentProps } from 'react'

import styles from './GameCountTracker.module.scss'

type DivProps = ComponentProps<'div'>

interface Props extends DivProps {
  number: number
  timeFrame: string
}

export const TrackerStat = ({ number, timeFrame }: Props) => {
  return (
    <div className={styles.statContainer}>
      <span className={styles.number}>{number}</span>
      <span className={styles.timeframe}>{timeFrame}</span>
    </div>
  )
}
