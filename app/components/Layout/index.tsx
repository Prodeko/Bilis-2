import type { ReactNode } from 'react'
import Head from 'next/head'
import styles from '@components/Layout/Layout.module.scss'
import { SidebarProvider, sidebarReducer } from '@root/state'
import Sidebar from './Sidebar'

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
      <SidebarProvider reducer={sidebarReducer}>
        <Sidebar />
      </SidebarProvider>
      <main className={styles.layout}>{children}</main>
    </>
  )
}

export default Layout
