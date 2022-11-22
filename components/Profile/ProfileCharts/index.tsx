import TimeSeriesChart from '@components/utility/TimeSeriesChart/TimeSeriesChart'
import { TimeSeriesGame } from '@common/types'

import PlayerComparison from './PlayerComparison'
import styles from './ProfileCharts.module.scss'

interface Props {
  gameData: TimeSeriesGame[]
  currentPlayerId: number
}

const ProfileCharts = ({ gameData, currentPlayerId }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>Elo Graph</h2>
        <TimeSeriesChart
          gameData={gameData}
          dataName="Elo Data"
          chartTitle="All Time Elo"
          height="100%"
        />
      </div>
      <div className={styles.chartContainer}>
        <h2 className={styles.chartTitle}>Player Comparison</h2>
        <PlayerComparison currentPlayerId={currentPlayerId} />
      </div>
    </div>
  )
}

export default ProfileCharts
