/* eslint-disable react/jsx-props-no-spreading */
import 'styles/globals.scss'
import type { AppProps } from 'next/app'
import BaseLayout from '@components/layouts/BaseLayout'
import { StateProvider, reducer } from '@state/index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StateProvider reducer={reducer}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </StateProvider>
  )
}

export default MyApp
