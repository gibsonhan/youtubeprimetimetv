import Link from 'next/link';
import Script from 'next/script';
import { View } from 'react-native';

const Test = (props: {}) => {
    async function authAndLoadClient() {
        let authData = undefined
        try {
            authData = await authenticate()
            await loadClient()
        }
        catch (error) {
            console.error('Authenticate and Load Client failed', authAndLoadClient)
        }
    }
    async function authenticate() {
        let auth = {}
        try {
            let auth2 = window.gapi.auth2
            auth = await auth2.getAuthInstance().signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
            console.log("Sign-in successful");
        }
        catch (error) {
            console.error("Error signing in", error)
        }
        return auth
    }
    async function loadClient() {
        try {
            let client = window.gapi.client
            client.setApiKey("AIzaSyD0IA4HnjdbmHGDl9_Q9fY0mlbTB_VzxRs");
            await client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
            console.log("GAPI client loaded for API", loadClient);
        }
        catch (error) {
            console.error("Error loading GAPI client for API", error);
        }
        return loadClient
    }
    // Make sure the client is loaded and sign-in is complete before calling this method.
    async function execute() {
        let list = {}
        try {
            //https://developers.google.com/youtube/v3/docs/subscriptions
            let subscriptions = window.gapi.client.youtube.subscriptions
            list = await subscriptions.list({
                "part": [
                    "contentDetails",
                    "id",
                    "snippet ",
                    "subscriberSnippet"
                ],
                "mine": true,
                "order": "unread"
            })
            console.log("subscriptions list", list);
        }
        catch (error) {
            console.error("Execute error", error);
        }
    }

    return (
        <View>
            <Script
                id="gapi"
                src="https://apis.google.com/js/api.js"
                strategy="beforeInteractive"
                onLoad={() => {
                    let gapi = window.gapi
                    gapi.load("client:auth2", {
                        callback: function () {
                            gapi.auth2.init({
                                client_id: "486025064243-8qhej8fb46i3fiird267mn1nrf43753g.apps.googleusercontent.com"
                            });
                            console.log('gapi.client loaded!')
                        },
                        onerror: function () {
                            console.log('gapi.client failed to load!')
                        },
                        timeout: 5000,
                        ontimeout: function () {
                            console.log('gapi.client could not load in a timely manner')
                        }
                    });
                }}
            />
            <div className="container mx-auto px-4">
                <Link href="/">
                    <div>Home </div>
                </Link>
                <button onClick={() => authAndLoadClient()}>auth</button>
                <br />
                <button onClick={() => execute()}>execute</button>
            </div>
        </View>
    )
}

export default Test
