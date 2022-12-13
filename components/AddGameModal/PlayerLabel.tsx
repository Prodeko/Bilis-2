import styles from './AddGameModal.module.scss'

const PlayerLabel = ({ type }: { type: 'winner' | 'loser' }) => {
  const text = type === 'winner' ? 'W I N N E R' : 'L O S E R'
  return (
    <div className={styles.playerLabel}>
      <h3 className={type === 'winner' ? styles.letter__winner : styles.letter__loser}>{text}</h3>
    </div>
  )
}

export default PlayerLabel
