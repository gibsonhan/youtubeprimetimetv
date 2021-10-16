import { useAtom } from 'jotai'
import Head from "next/head"
import { useRouter } from "next/router"
import Script from 'next/script'
//store
import { alertAtom } from "store/atom"

export default function YoutubeInUp() {
    const router = useRouter()
    const [_, setAlert] = useAtom(alertAtom)
    return (
        <>
            <Head>
                <meta name="google-signin-client_id" content="486025064243-8qhej8fb46i3fiird267mn1nrf43753g.apps.googleusercontent.com" />
            </Head>
            <Script
                src='https://apis.google.com/js/platform.js'
                strategy="beforeInteractive"
                onLoad={() => {
                    async function onSuccess(googleUser: any) {
                        const idToken = googleUser.getAuthResponse().id_token
                        const url = 'http://localhost:3001/auth/google/signin'
                        try {
                            const res = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ idToken: idToken })
                            })
                            if (res.ok) router.push('/signin');
                            else {
                                const { error, message } = await res.json();
                                throw `${error} ${message}`
                            }

                        }
                        catch (error: any) {
                            setAlert(error)
                        }

                    }
                    function onFailure(error: any) {
                        setAlert('Failed to In Up with Google')
                    }
                    function renderButton() {
                        window.gapi.signin2.render('g-signup2', {
                            'scope': 'email',
                            'width': 240,
                            'height': 50,
                            'longtitle': true,
                            'theme': 'dark',
                            'onsuccess': onSuccess,
                            'onfailure': onFailure
                        });
                    }

                    renderButton()
                }}
            />
            <div id="g-signup2" className="mb-12" />
        </>
    )
}