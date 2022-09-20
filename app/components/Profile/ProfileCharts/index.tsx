import PlayerComparison from './PlayerComparison'
import styles from './ProfileCharts.module.scss'

const ProfileCharts = () => {
  // TODO: Change layout to horizontal 2D layout and move titles to chart components.
  return (
    <div className={styles.container}>
      <h2 className={styles.chartTitle}>Elo Graph</h2>
      <h2 className={styles.chartTitle}>Player Comparison</h2>
      <div className={styles.eloGraph}>Elo graph comes here</div>
      <PlayerComparison />
    </div>
  )
}

export default ProfileCharts
