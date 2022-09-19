import { ReactNode } from 'react'
import Head from 'next/head'
import styles from './BaseLayout.module.scss'
import Sidebar from './Sidebar'

interface LayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: LayoutProps): JSX.Element => {
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

export default BaseLayout
