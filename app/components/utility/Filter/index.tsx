import { ReactNode } from 'react'

import styles from './Filter.module.scss'

const Filter = ({ children }: { children: ReactNode }) => {
  return <div className={styles.filter}>{children}</div>
}

export default Filter
