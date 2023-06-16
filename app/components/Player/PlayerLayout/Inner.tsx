import { ReactNode } from 'react'
import styles from './PlayerLayout.module.scss'

interface Props {
  children: ReactNode
}

export const PlayerLayoutInner = ({ children }: Props) => {
  return <div className={styles.playerContainerInner}>{children}</div>
}
