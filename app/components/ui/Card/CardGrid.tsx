import { ReactNode } from 'react'

import styles from './Card.module.scss'

interface Props {
  children: ReactNode
}

export const CardGrid = ({ children }: Props) => {
  return <div className={styles.cardgrid}>{children}</div>
}
