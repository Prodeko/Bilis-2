import { KeyboardEventHandler, ReactNode } from 'react'

import styles from './HomeLayout.module.scss'

const HomeLayout = ({
  children,
  onKeyDown,
}: {
  children: ReactNode
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}) => {
  return (
    <div tabIndex={-1} onKeyDown={onKeyDown} className={styles['grid__layout']}>
      {children}
    </div>
  )
}

export default HomeLayout
