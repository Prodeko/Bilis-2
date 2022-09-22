import styles from './Table.module.scss'

const HeaderRow = () => {
  return (
    <tr className={styles['row__header']}>
      <th className={styles.position}>Position</th>
      <th className={styles.player}>Player</th>
      <th className={styles.elo}>Elo</th>
    </tr>
  )
}

export default HeaderRow
