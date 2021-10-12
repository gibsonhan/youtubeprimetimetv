import Head from "next/head"
import Script from 'next/script'
import { useEffect, useRef } from "react"

export default function YoutubeSignUp() {
    const gSignUpRef = useRef()
    console.log(gSignUpRef)
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
                        const id_token = googleUser.getAuthResponse().id_token
                        console.log('id token', id_token)
                        const data = {
                            idToken: id_token,
                        }
                        const reqObject = {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        }
                        const response = await fetch('/api/user/signup', reqObject)
                        const result = await response.json()
                        console.log(result)
                    }
                    function onFailure(error: any) {
                        console.log(error);
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
            <div id="g-signup2" ref={gSignUpRef} />
        </>
    )
}