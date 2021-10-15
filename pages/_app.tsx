//import '../styles/globals.css'
import '../styles/tailwind.css'
//lib
import type { AppProps } from 'next/app'
import { Provider } from 'jotai'
//component
import AppLayout from '@/components/layout/AppLayout'
import { default as AlertMessage } from '@/components/common/AlertModal'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </Provider>
  )
}
export default MyApp
