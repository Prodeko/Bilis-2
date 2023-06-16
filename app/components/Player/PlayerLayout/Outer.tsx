import { ReactNode } from 'react'
import styles from './PlayerLayout.module.scss'

interface Props {
  children: ReactNode
}

export const PlayerLayoutOuter = ({ children }: Props) => {
  return <div className={styles.playerContainerOuter}>{children}</div>
}
