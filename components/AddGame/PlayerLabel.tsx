import styles from './AddGame.module.scss'

const PlayerLabel = ({ type }: { type: 'winner' | 'loser' }) => {
  const text = type === 'winner' ? 'W I N N E R' : 'L O S E R'

  return (
    <div className={styles.playerLabel}>
      <h3 className={type === 'loser' ? styles.loser : ''}>{text}</h3>
    </div>
  )
}

export default PlayerLabel
