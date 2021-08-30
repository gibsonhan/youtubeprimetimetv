import Link from 'next/link';
import Script from 'next/script';
import {
    useEffect,
    useState
} from 'react';
import { View } from 'react-native';

//helpers
import { isNotEmpty } from '../../utilities/isNotEmpty';
import {
    authenticate,
    loadClient,
    loadSubscription,
    initYoutubeClient
} from '../../utilities/youtubeHelper';

const Test = (props: {}) => {
    const [auth, setAuth] = useState({ })
    const [subscription, setSubscription] = useState({ })

    async function authAndLoadClient() {
        let authData = { }
        try {
            authData = await authenticate()
            setAuth(authData)
            await loadClient()
        }
        catch (error) {
            console.error('Authenticate and Load Client failed', authAndLoadClient)
        }
        setAuth(authData)
    }

    async function getSubscription() {
        let list: any = await loadSubscription()
        if (isNotEmpty(list)) {
            setSubscription(list)
        }
    }

    useEffect(() => {
        console.log('checking data')
    }, [auth, subscription])

    return (
        <View>
            <Script
                id="gapi"
                src="https://apis.google.com/js/api.js"
                strategy="beforeInteractive"
                onLoad={() => { initYoutubeClient() }}
            />
            <div className="container mx-auto px-4">
                <Link href="/">
                    <div>Home </div>
                </Link>
                <button onClick={() => authAndLoadClient()}>Login</button>
                <br />
                <button onClick={() => getSubscription()}>Get My Subscriptions</button>
            </div>
        </View>
    )
}

export default Test
