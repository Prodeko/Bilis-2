import { ReactNode, useEffect } from 'react'
import Head from 'next/head'

import axios from 'axios'
import { NEXT_PUBLIC_API_URL } from '@config/index'
import type { HomeLeaderboard } from '@common/types'
import { useStateValue, setPlayers } from '@state/index'
import styles from './BaseLayout.module.scss'

interface LayoutProps {
  children: ReactNode
}

const BaseLayout = ({ children }: LayoutProps): JSX.Element => {
  // Fetch leaderboard data
  const [, dispatch] = useStateValue()
  useEffect(() => {
    const response = axios.get(`${NEXT_PUBLIC_API_URL}/leaderboard`)
    response.then(res => {
      const leaderboard: HomeLeaderboard = res.data
      dispatch(setPlayers(leaderboard))
    })
  }, [dispatch])

  return (
    <>
      <Head>
        <title>Biliskilke 2.0</title>
        <meta charSet="UTF-8" />
      </Head>
      <main className={styles.layout}>{children}</main>
    </>
  )
}

export default BaseLayout
