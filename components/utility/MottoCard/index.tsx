import styles from './MottoCard.module.scss'

interface Props {
  text: string
  author: string
  switching: boolean // Determines if the motto is switching to another or not
}

const MottoCard = ({ text, author, switching }: Props) => {
  return (
    <div className={switching ? styles.card__switching : styles.card}>
      <h2 className={styles.quoteTitle}>Personal motto</h2>
      <span className={styles.quoteText}>{text}</span>
      <span className={styles.quoteAuthor}>- {author}</span>
    </div>
  )
}

export default MottoCard
