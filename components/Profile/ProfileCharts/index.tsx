import TimeSeriesChart from '@components/utility/TimeSeriesChart/TimeSeriesChart'

import PlayerComparison from './PlayerComparison'
import styles from './ProfileCharts.module.scss'

interface Props {
  eloData: number[]
  currentPlayerId: number
}

const ProfileCharts = ({ eloData, currentPlayerId }: Props) => {
  // TODO: Change layout to horizontal 2D layout and move titles to chart components.
  return (
    <div className={styles.container}>
      <h2 className={styles.chartTitle}>Elo Graph</h2>
      <h2 className={styles.chartTitle}>Player Comparison</h2>
      {/* <div className={styles.eloGraph}>Elo graph comes here</div> */}
      <div className={styles.chartContainer}>
        <TimeSeriesChart
          data={eloData}
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
