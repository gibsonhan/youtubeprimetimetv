import Head from "next/head"
import Script from 'next/script'

export default function YoutubeSignIn() {
    return (
        <>
            <Head>
                <meta name="google-signin-client_id" content="486025064243-8qhej8fb46i3fiird267mn1nrf43753g.apps.googleusercontent.com" />
            </Head>
            <Script
                src='https://apis.google.com/js/platform.js'
                strategy="beforeInteractive"
                onLoad={() => {
                    function onSuccess(googleUser: any) {
                        const id_token = googleUser.getAuthResponse().id_token
                        console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
                        console.log('Id, token', id_token)
                    }
                    function onFailure(error: any) {
                        console.log(error);
                    }
                    function renderButton() {
                        window.gapi.signin2.render('g-signin2', {
                            'scope': 'profile email',
                            'width': 240,
                            'height': 50,
                            'longtitle': true,
                            'theme': 'dark',
                            'onsuccess': onSuccess,
                            'onfailure': onFailure
                        });
                    }
                    console.log(window)

                    renderButton()
                }}
            />
            <div id="g-signin2" />
        </>
    )
}