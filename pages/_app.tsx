/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import LoadingSpinner from '@components/utility/LoadingSpinner'
import 'styles/globals.scss'

import BaseLayout from '@components/Layout/BaseLayout'

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any // TODO: Temp fix
  const [loading, setLoading] = useState<boolean>(false)

  // Loading commands
  const start = () => {
    setLoading(true)
  }
  const end = () => {
    setLoading(false)
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', end)
    Router.events.on('routeChangeError', end)
    return () => {
      Router.events.off('routeChangeStart', start)
      Router.events.off('routeChangeComplete', end)
      Router.events.off('routeChangeError', end)
    }
  }, [])

  return (
    <>
      <Head>
        <title>Biliskilke 2.0</title>
        <meta charSet="UTF-8" />
      </Head>
      <BaseLayout>{loading ? <LoadingSpinner /> : <AnyComponent {...pageProps} />}</BaseLayout>
    </>
  )
}

export default MyApp
