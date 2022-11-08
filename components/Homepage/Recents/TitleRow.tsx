import styles from './Recents.module.scss'

const TitleRow = () => {
  return (
    <div className={styles.titleRow}>
      <h2 className={styles.title}>Recents</h2>
      <button className={styles.removeButton}>Remove latest</button>
    </div>
  )
}

export default TitleRow
