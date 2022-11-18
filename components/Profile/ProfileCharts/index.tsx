import TimeSeriesChart from '@components/utility/TimeSeriesChart/TimeSeriesChart'
import { TimeSeriesGame } from '@common/types'

import PlayerComparison from './PlayerComparison'
import styles from './ProfileCharts.module.scss'

interface Props {
  gameData: TimeSeriesGame[]
  currentPlayerId: number
}

const ProfileCharts = ({ gameData, currentPlayerId }: Props) => {
  // TODO: Change layout to horizontal 2D layout and move titles to chart components.
  return (
    <div className={styles.container}>
      <h2 className={styles.chartTitle}>Elo Graph</h2>
      <h2 className={styles.chartTitle}>Player Comparison</h2>
      {/* <div className={styles.eloGraph}>Elo graph comes here</div> */}
      <div className={styles.chartContainer}>
        <TimeSeriesChart
          gameData={gameData}
          dataName="Elo Data"
          chartTitle="All Time Elo"
          height="100%"
        />
      </div>
      <PlayerComparison currentPlayerId={currentPlayerId} />
    </div>
  )
}

export default ProfileCharts
