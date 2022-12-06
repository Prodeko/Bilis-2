import styles from './ModalBlur.module.scss'
import type { ReactNode } from 'react'

const ModalBlur = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>
}

export default ModalBlur
