import styles from './MottoCard.module.scss'

const MottoCard = ({ text, author }: { text: string; author: string }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.quoteTitle}>Personal motto</h2>
      <p className={styles.quoteText}>{text}</p>
      <p className={styles.quoteAuthor}>- {author}</p>
    </div>
  )
}

export default MottoCard
