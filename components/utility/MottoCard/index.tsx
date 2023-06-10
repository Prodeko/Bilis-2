import { ComponentProps } from 'react'

import styles from './MottoCard.module.scss'

type DivProps = ComponentProps<'div'>

interface Props extends DivProps {
  text: string
  author: string
  switching: boolean // Determines if the motto is switching to another or not
}

const MottoCard = ({ text, author, switching, ...props }: Props) => {
  return (
    <div {...props} className={switching ? styles.card__switching : styles.card}>
      <h2 className={styles.quoteTitle}>Personal motto</h2>
      <span className={styles.quoteText}>{text}</span>
      <span className={styles.quoteAuthor}>- {author}</span>
    </div>
  )
}

export default MottoCard
