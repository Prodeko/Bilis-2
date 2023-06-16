import { ReactNode } from 'react'
import styles from './NewProfileLayout.module.scss'

interface Props {
  children: ReactNode
}

export const NewProfileLayoutOuter = ({ children }: Props) => {
  return <div className={styles.newProfileContainerOuter}>{children}</div>
}
