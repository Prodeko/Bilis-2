import { ReactNode } from 'react'
import styles from './PlayerLandingLayout.module.scss'
const SerachContainer = ({ children }: { children: ReactNode }) => {
  return <div className={styles.searchContainer}>{children}</div>
}

export default SerachContainer
