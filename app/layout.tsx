import Sidebar from 'app/components/ui/Sidebar'
import { Metadata } from 'next'
import { ReactNode } from 'react'
import 'styles/globals.scss'

import { getCurrentSeason } from '@server/db/seasons'

import styles from './Home.module.scss'

interface Props {
  children: ReactNode
}

export const metadata: Metadata = {
  title: 'Biliskilke 2.0',
}

export default async function RootLayout({ children }: Props) {
  const currentSeason = await getCurrentSeason().then(s => s?.toJSON())
  return (
    <html lang="en">
      <body className={styles.baseGrid}>
        <Sidebar currentSeason={currentSeason} />
        <main className={styles.layout}>{children}</main>
      </body>
    </html>
  )
}

export const dynamic = 'force-dynamic'