import { ReactNode } from 'react'
import styles from './HomeLayout.module.scss'

const HomeLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles['grid__layout']}>{children}</div>
}

export default HomeLayout
