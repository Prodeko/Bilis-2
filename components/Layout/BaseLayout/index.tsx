import { ReactNode } from 'react'

import styles from './BaseLayout.module.scss'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className={styles.grid}>
      <Sidebar />
      <main className={styles.layout}>{children}</main>
    </div>
  )
}

export default BaseLayout
