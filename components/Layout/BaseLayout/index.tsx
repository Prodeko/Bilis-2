import { ReactNode } from 'react'

import styles from './BaseLayout.module.scss'
import Sidebar from './Sidebar'
import Notification from '../../utility/Notification'

interface LayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.grid_vertical}>
      <Notification />
      <div className={styles.grid}>
        <Sidebar />
        <main className={styles.layout}>{children}</main>
      </div>
    </div>
  )
}

export default BaseLayout
