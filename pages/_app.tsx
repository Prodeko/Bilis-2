/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'styles/globals.scss'

import BaseLayout from '@components/Layout/BaseLayout'
import { StateProvider, reducer } from '@state/index'

function MyApp({ Component, pageProps }: AppProps) {
  const AnyComponent = Component as any // TODO: Temp fix
  return (
    <>
      <Head>
        <title>Biliskilke 2.0</title>
        <meta charSet="UTF-8" />
      </Head>
      <StateProvider reducer={reducer}>
        <BaseLayout>
          <AnyComponent {...pageProps} />
        </BaseLayout>
      </StateProvider>
    </>
  )
}

export default MyApp