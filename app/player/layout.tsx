import { ReactNode } from 'react'
import Header from '@ui/Header/Player'

import styles from './PlayerLanding.module.scss'

const PlayerLandingLayout = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>
    <Header includeAddPlayerButton />
    {children}
  </div>
}

export default PlayerLandingLayout
