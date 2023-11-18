import Sidebar from 'app/components/ui/Sidebar'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import 'styles/globals.scss'

import styles from './Home.module.scss'
import { SeasonalModeProvider } from '@state/Season/state'

interface Props {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Biliskilke 2.0',
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={styles.baseGrid}>
        <SeasonalModeProvider>
          <Sidebar />
          <main className={styles.layout}>{children}</main>
        </SeasonalModeProvider>
      </body>
    </html>
  )
}
