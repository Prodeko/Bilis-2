/* eslint-disable react/jsx-props-no-spreading */
import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import BaseLayout from '@components/Layout/BaseLayout'
import { StateProvider, reducer } from '@state/index'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Biliskilke 2.0</title>
        <meta charSet="UTF-8" />
      </Head>
      <StateProvider reducer={reducer}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </StateProvider>
    </>
  )
}

export default MyApp
