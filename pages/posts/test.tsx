import Link from 'next/link';
import Script from 'next/script';
import {
    useEffect,
    useState
} from 'react';
import { View } from 'react-native';
import SubscriptionList from '../../components/SubscriptionList';

//helpers
import { isNotEmpty } from '../../utilities/isNotEmpty';
import { tempData } from '../../utilities/tempData';
import {
    authenticate,
    loadClient,
    loadSubscription,
    initYoutubeClient,
} from '../../utilities/youtubeHelper';

const Test = (props: {}) => {
    const [auth, setAuth] = useState({ })
    const [subscription, setSubscription] = useState({ }) //remove tempData to test nextpage

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

    async function getSubscription(token: string = '') {
        try {
            let list: any = await loadSubscription(token)
            setSubscription(list)
        }
        catch (error) {
            console.error('Failed to get subscriptions', error)
        }
    }

    useEffect(() => {
        console.log('what is subscription list', subscription)
    }, [subscription])

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
                {isNotEmpty(subscription) && <SubscriptionList getSubscription={getSubscription}{...subscription} />}
            </div>
        </View>
    )
}

//Next steps or at the end of the week type up. how to learn how to rate limit and shit
//https://stackoverflow.com/questions/57522524/client-side-request-rate-limiting
//'https://nordicapis.com/everything-you-need-to-know-about-api-rate-limiting/'

export default Test
