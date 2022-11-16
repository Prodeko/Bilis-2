/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'styles/globals.scss'

import BaseLayout from '@components/Layout/BaseLayout'
import { QueueProvider, reducer } from '@state/Queue'

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any // TODO: Temp fix
  return (
    <>
      <Head>
        <title>Biliskilke 2.0</title>
        <meta charSet="UTF-8" />
      </Head>
      <QueueProvider reducer={reducer}>
        <BaseLayout>
          <AnyComponent {...pageProps} />
        </BaseLayout>
      </QueueProvider>
    </>
  )
}

export default MyApp
