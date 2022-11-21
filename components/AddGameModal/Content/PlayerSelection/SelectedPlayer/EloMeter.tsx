import type { Player } from '@common/types'
import GaugeChart from 'react-gauge-chart'
import styles from './SelectedPlayer.module.scss'
import { round } from 'lodash'

// API: https://github.com/Martin36/react-gauge-chart

const EloMeter = ({ player }: { player: Player }) => {
  const MIN_ELO = 0
  const MAX_ELO = 800
  const pointerPosition = player.elo / MAX_ELO

  return (
    <div className={styles.gauge}>
      <GaugeChart
        animateDuration={2000}
        animDelay={100}
        colors={['#CC0000', '#00BB00']} // Flip red and green colors
        cornerRadius={1}
        hideText={true}
        id={`gauge-chart-${player.id}`}
        needleColor={'#ddd'}
        nrOfLevels={20}
        percent={pointerPosition}
      />
      <span className={styles.currentelo}>{round(player.elo, 2)}</span>
      <span className={styles.minelo}>{MIN_ELO}</span>
      <span className={styles.maxelo}>{MAX_ELO}</span>
    </div>
  )
}

export default EloMeter
