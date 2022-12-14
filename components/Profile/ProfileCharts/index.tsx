import { TimeSeriesGame } from '@common/types'
import TimeSeriesChart from '@components/utility/TimeSeriesChart/TimeSeriesChart'

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
        <h2 className={styles.chartTitle}>Fargo Graph</h2>
        <TimeSeriesChart
          gameData={gameData}
          dataName="Fargo Data"
          chartTitle="All Time Fargo"
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
