import { ReactNode } from 'react'

import type { GridPosition } from '@common/types'

import styles from './Card.module.scss'

interface Props {
  children: ReactNode
  gridPosition?: GridPosition
}

export const Card = ({ children, gridPosition }: Props) => {
  return (
    <div className={styles.card} style={gridPosition}>
      {children}
    </div>
  )
}
