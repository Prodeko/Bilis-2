import type { ReactNode } from 'react'

import styles from './TitleRow.module.scss'

interface Props {
  children: ReactNode
}

export const TitleRow = ({ children }: Props) => {
  return (
    <div className={styles.titlerow}>
      {children}
      {/* {variation === 'Queue' && <PlayerSearchQueue />}
      )} */}
    </div>
  )
}
