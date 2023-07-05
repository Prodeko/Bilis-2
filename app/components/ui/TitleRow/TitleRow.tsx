import type { ComponentProps, ReactNode } from 'react'

import styles from './TitleRow.module.scss'

type DivProps = ComponentProps<'div'>

interface Props extends DivProps {
  children: ReactNode
}

export const TitleRow = ({ children, ...props }: Props) => {
  return (
    <div {...props} className={styles.titlerow}>
      {children}
    </div>
  )
}
