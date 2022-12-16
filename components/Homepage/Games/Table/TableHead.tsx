import styles from './Table.module.scss'

const TableHead = () => {
  return (
    <div className={styles['row__header']}>
      <span className={styles.time}>Time</span>
      <span className={styles.winner}>Winner</span>
      <span className={styles.winnerEloChange__header}>Winner fargo</span>
      <span className={styles.loser}>Loser</span>
      <span className={styles.loserEloChange__header}>Loser fargo</span>
    </div>
  )
}

export default TableHead
