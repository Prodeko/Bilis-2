import '@components/styles/globals.scss'
import type { AppProps } from 'next/app'
import BaseLayout from '@components/layouts/BaseLayout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  )
}

export default MyApp
