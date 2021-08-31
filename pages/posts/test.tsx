import Link from 'next/link';
import Script from 'next/script';
import {
    useEffect,
    useState
} from 'react';
import { View } from 'react-native';
import SubscriptionIcon from '../../components/SubscriptionIcon';

//helpers
import { isNotEmpty } from '../../utilities/isNotEmpty';
import { tempData } from '../../utilities/tempData';
import {
    authenticate,
    loadClient,
    loadSubscription,
    initYoutubeClient
} from '../../utilities/youtubeHelper';

const Test = (props: {}) => {
    const [auth, setAuth] = useState({ })
    const [first, setFirst] = useState({ })
    const [subscription, setSubscription] = useState(tempData)

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
        const subscriptionOne = subscription.items[0].snippet
        setFirst(subscriptionOne)
    }, [])

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

                <SubscriptionIcon data={first} />
            </div>
        </View>
    )
}

export default Test
