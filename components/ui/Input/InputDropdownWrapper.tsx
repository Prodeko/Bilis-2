import { ComponentProps, ReactNode } from 'react'

import styles from './Input.module.scss'

type DivProps = ComponentProps<'div'>

interface Props extends DivProps {
  children: ReactNode
}

export const InputDropdownWrapper = ({ children, ...props }: Props) => {
  return (
    <div className={styles.wrapper} {...props}>
      {children}
    </div>
  )
}
