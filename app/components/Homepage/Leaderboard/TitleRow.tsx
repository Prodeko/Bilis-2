import styles from './Leaderboard.module.scss'

const TitleRow = () => {
  return (
    <div className={styles['row__title']}>
      <h2 className={styles.title}>Leaderboard</h2>
      {/* TODO!! Buttons for switching between all time and seasonal leaderboard */}
    </div>
  )
}

export default TitleRow
