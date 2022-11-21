import type { Player } from '@common/types'
import GaugeChart from 'react-gauge-chart'
import styles from './SelectedPlayer.module.scss'

// API: https://github.com/Martin36/react-gauge-chart

const EloMeter = ({ player }: { player: Player }) => {
  const MIN_ELO = 0
  const MAX_ELO = 800
  const pointerPosition = player.elo / MAX_ELO

  return (
    <GaugeChart
      animateDuration={2000}
      animDelay={100}
      className={styles.gauge}
      colors={['#CC0000', '#00BB00']} // Flip red and green colors
      cornerRadius={1}
      formatTextValue={(eloPercent: string) => (8 * Number(eloPercent)).toFixed(2)}
      id={`gauge-chart-${player.id}`}
      nrOfLevels={20}
      percent={pointerPosition}
    />
  )
}

export default EloMeter
