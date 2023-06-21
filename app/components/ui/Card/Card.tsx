import { ComponentProps, ReactNode } from 'react'

import styles from './Card.module.scss'

export type CardProps = ComponentProps<'div'>

interface Props extends CardProps {
  children: ReactNode
}

export const Card = ({ children, ...props }: Props) => {
  return (
    <div {...props} className={styles.card}>
      {children}
    </div>
  )
}
