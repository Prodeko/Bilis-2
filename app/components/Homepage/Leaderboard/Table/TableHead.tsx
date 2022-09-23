import styles from './Table.module.scss'

const TableHead = () => {
  return (
    <thead>
      <tr className={styles['row__header']}>
        <th className={styles.position}>Position</th>
        <th className={styles.player}>Player</th>
        <th className={styles.elo}>Elo</th>
      </tr>
    </thead>
  )
}

export default TableHead
