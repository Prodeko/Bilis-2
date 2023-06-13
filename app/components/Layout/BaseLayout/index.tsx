import Sidebar from 'app/components/ui/Sidebar'
import { ReactNode } from 'react'

import styles from './BaseLayout.module.scss'

interface LayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.grid}>
      <Sidebar />
      <main className={styles.layout}>{children}</main>
      <p className={styles.versioning}>Version 1.1.0 - Raikku 🐔</p>
    </div>
  )
}

export default BaseLayout
