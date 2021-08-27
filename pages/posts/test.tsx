import { getPageFiles } from 'next/dist/server/get-page-files';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

//https://github.com/vercel/next.js/pull/18281
//Current issue is that on first load. The script is not loaded fast enough
//When you make an edit. The library has loaded and it can fetch the proper methods.
const Test = (props: {}) => {
    const [state, setState]: any = useState(false)

    useEffect(() => {
        if (!state) {
            console.log('state is false', false)
            return
        }
        function authenticate() {
            return window.gapi.auth2.getAuthInstance()
                .signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
                .then(function () { console.log("Sign-in successful"); },
                    function (err) { console.error("Error signing in", err); });
        }
        function loadClient() {
            window.gapi.client.setApiKey("AIzaSyD0IA4HnjdbmHGDl9_Q9fY0mlbTB_VzxRs");
            return window.gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
                .then(function () { console.log("GAPI client loaded for API"); },
                    function (err) { console.error("Error loading GAPI client for API", err); });
        }
        // Make sure the client is loaded and sign-in is complete before calling this method.
        function execute() {
            return window.gapi.client.youtube.subscriptions.list({})
                .then(function (response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);
                },
                    function (err) { console.error("Execute error", err); });
        }
        console.log('state is true1', state)

        try {
            window.gapi.load("client:auth2", function () {
                window.gapi.auth2.init({ client_id: "486025064243-8qhej8fb46i3fiird267mn1nrf43753g.apps.googleusercontent.com" });
            });
            let login = authenticate().then(loadClient)

            if (login) {
                execute()
            }
            else {
                throw Error('Failed to execute')
            }
        }
        catch (error) {
            console.log(error, { message: 'failed to load gapi' })
        }

    }, [state])


    return (
        <View>
            <Script
                src="https://apis.google.com/js/api.js"
                strategy="beforeInteractive"
                onLoad={() => {
                    setState(true)
                }}
            />
            <div className="container mx-auto px-4">
                <Link href="/">
                    <div>Home </div>
                </Link>
                <h1> test {console.log('hello', props)}</h1>
            </div>
        </View>
    )
}

export async function getServerSideProps() {
    return { props: { 'test': 'hello' } }
}

export default Test
