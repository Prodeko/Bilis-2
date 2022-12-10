import styles from './Table.module.scss'

const TableHead = () => {
  return (
    <thead>
      <tr className={styles['row__header']}>
        <th className={styles.time}>Time</th>
        <th className={styles.winner}>Winner</th>
        <th className={styles.winnerEloChange}>Winner fargo</th>
        <th className={styles.loser}>Loser</th>
        <th className={styles.loserEloChange}>Loser fargo</th>
      </tr>
    </thead>
  )
}

export default TableHead
