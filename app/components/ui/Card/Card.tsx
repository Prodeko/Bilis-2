import { ComponentProps, ReactNode } from 'react'

import type { GridPosition } from '@common/types'

import styles from './Card.module.scss'

type DivProps = ComponentProps<'div'>

interface Props extends DivProps {
  children: ReactNode
  gridPosition?: GridPosition
}

export const Card = ({ children, gridPosition, ...props }: Props) => {
  return (
    <div {...props} className={styles.card} style={gridPosition}>
      {children}
    </div>
  )
}
