import PlayerComparison from './PlayerComparison'
import styles from './ProfileCharts.module.scss'
import TimeSeriesChart from '@components/utility/TimeSeriesChart/TimeSeriesChart'

const dummyEloData = [
  400, 410, 420.5, 410, 415, 399, 380, 370, 365, 355, 365, 370, 364, 358, 370, 381, 391, 398, 405,
  410, 402, 413, 425, 433, 440, 437, 444, 431, 425, 437, 425, 421, 400, 410, 420.5, 410, 415, 399,
  380, 370, 365, 355, 365, 370, 364, 358, 370, 381, 391, 398, 405, 410, 402, 413, 425, 433, 440,
  437, 444, 431, 425, 437, 425, 421, 400, 410, 420.5, 410, 415, 399, 380, 370, 365, 355, 365, 370,
  364, 358, 370, 381, 391, 398, 405, 410, 402, 413, 425, 433, 440, 437, 444, 431, 425, 437, 425,
  421,
]

const ProfileCharts = () => {
  // TODO: Change layout to horizontal 2D layout and move titles to chart components.
  return (
    <div className={styles.container}>
      <h2 className={styles.chartTitle}>Elo Graph</h2>
      <h2 className={styles.chartTitle}>Player Comparison</h2>
      {/* <div className={styles.eloGraph}>Elo graph comes here</div> */}
      <div className={styles.chartContainer}>
        <TimeSeriesChart
          data={dummyEloData}
          dataName="Elo Data"
          chartTitle="All Time Elo"
          height="100%"
        />
      </div>
      <PlayerComparison />
    </div>
  )
}

export default ProfileCharts
