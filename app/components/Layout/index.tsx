import type { ReactNode } from 'react'
import Head from 'next/head'
import Sidebar from './Sidebar'
import styles from './Layout.module.scss'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Biliskilke 2.0</title>
        <meta charSet="UTF-8" />
      </Head>
      <Sidebar />
      <main className={styles.layout}>{children}</main>
    </>
  )
}

export default Layout
