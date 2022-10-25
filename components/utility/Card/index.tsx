import { ReactNode } from 'react'

import styles from './Card.module.scss'

interface Props {
  children: ReactNode
  colspan?: string
  rowspan?: string
}

const Card = ({ children, colspan, rowspan }: Props) => {
  const inlineStyles = {
    gridColumn: colspan,
    gridRow: rowspan,
  }

  return (
    <div style={inlineStyles} className={styles.card}>
      <div className={styles.cardgrid}>{children}</div>
    </div>
  )
}

export default Card
