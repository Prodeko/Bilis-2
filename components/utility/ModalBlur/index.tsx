import type { ReactNode } from 'react'

import styles from './ModalBlur.module.scss'

const ModalBlur = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>
}

export default ModalBlur
