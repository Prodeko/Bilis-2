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
    // add id so that we can set the focus on this after a new game is added
    <div id="home-layout" tabIndex={-1} onKeyDown={onKeyDown} className={styles['grid__layout']}>
      {children}
    </div>
  )
}

export default HomeLayout
