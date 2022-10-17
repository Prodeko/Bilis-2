import { ReactNode } from 'react'

import styles from './PlayerLandingLayout.module.scss'

const PlayerLandingLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>
}

export default PlayerLandingLayout
