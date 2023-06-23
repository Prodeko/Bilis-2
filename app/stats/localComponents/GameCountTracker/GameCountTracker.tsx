import { ComponentProps } from 'react'

import { StatsTitle } from '../StatsTitle/StatsTitle'
import styles from './GameCountTracker.module.scss'
import { TrackerContainer } from './TrackerContainer'

type DivProps = ComponentProps<'div'>

type Props = DivProps

export const GameCountTracker = ({ ...props }: Props) => {
  return (
    <div {...props} className={styles.layout}>
      <StatsTitle
        style={{
          fontSize: '3.2rem',
          lineHeight: '3.2rem',
        }}
        title="Game tracker"
      />
      <TrackerContainer />
    </div>
  )
}
