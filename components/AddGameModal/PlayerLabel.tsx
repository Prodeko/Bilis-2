import styles from './AddGameModal.module.scss'

const PlayerLabel = ({ type }: { type: 'winner' | 'loser' }) => {
  const text = type === 'winner' ? 'W I N N E R' : 'L O S E R'

  const writeLetters = (word: string) => {
    return (
      <>
        {word.split('').map((letter: string) => {
          return (
            <span className={type === 'winner' ? styles.letter__winner : styles.letter__loser}>
              {letter}
            </span>
          )
        })}
      </>
    )
  }

  return (
    <div className={styles.playerLabel}>
      <h3 className={type === 'winner' ? styles.letter__winner : styles.letter__loser}>{text}</h3>
    </div>
  )
}

export default PlayerLabel
