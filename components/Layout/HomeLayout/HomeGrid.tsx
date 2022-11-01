import { ReactNode } from 'react'

import styles from './HomeLayout.module.scss'

const HomeGrid = ({ children }: { children: ReactNode }) => {
  return <div className={styles['grid__content']}>{children}</div>
}

export default HomeGrid
