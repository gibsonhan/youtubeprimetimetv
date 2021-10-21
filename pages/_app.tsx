//import '../styles/globals.css'
import '../styles/tailwind.css'
//lib
import { useAtom } from 'jotai'
import type { AppProps } from 'next/app'
//component
import AppLayout from '@/components/layout/AppLayout'
//store
import { signedInAtom } from '@store/atom'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const [, setSignIn] = useAtom(signedInAtom)

  function handleSignIn() {
    const accessToken = document.cookie
        .split('; ')
        .find((row: string) => row.startsWith('accessToken='))
        ?.split('=')[1]
    
    if(accessToken){
      setSignIn(true)
    }
  }

  useEffect(() => {
    handleSignIn()
  }, [])

  return (
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
  )
}



export default MyApp
