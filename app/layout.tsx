import Sidebar from 'app/components/ui/Sidebar'
import { ReactNode } from 'react'
import 'styles/globals.scss'

import styles from './Home.module.scss'

interface Props {
  children: ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={styles.baseGrid}>
        <Sidebar />
        <main className={styles.layout}>{children}</main>
        <p className={styles.versioning}>Version 1.1.0 - Raikku 🐔</p>
      </body>
    </html>
  )
}
