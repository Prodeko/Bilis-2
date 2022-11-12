import { Player } from '@common/types'
import styles from './MottoCard.module.scss'

const MottoCard = ({ text, author }: { text: string; author: string }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.quoteTitle}>Personal motto</h2>
      <span className={styles.quoteText}>{text}</span>
      <span className={styles.quoteAuthor}>- {author}</span>
    </div>
  )
}

export default MottoCard
