import styles from './Table.module.scss'

const TableHead = () => {
  return (
    <div className={styles['row__header']}>
      <span className={styles.position}>Position</span>
      <span className={styles.player}>Player</span>
      <span className={styles.elo}>Fargo</span>
    </div>
  )
}

export default TableHead
