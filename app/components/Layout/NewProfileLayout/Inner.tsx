import { ReactNode } from 'react'
import styles from './NewProfileLayout.module.scss'

interface Props {
  children: ReactNode
}

export const NewProfileLayoutInner = ({ children }: Props) => {
  return <div className={styles.newProfileContainerInner}>{children}</div>
}
