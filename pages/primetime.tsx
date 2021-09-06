import Script from 'next/script';
import { useRef, useState } from "react"
import { View } from "react-native"

//component
import PrimeTimeList from '@/components/PrimeTimeList';
import SubscriptionList from '@/components/SubscriptionList';

//helpers
import { isEmpty } from '@/utility/isEmpty';
import { isNotEmpty } from '@/utility/isNotEmpty';
import { tempData } from "@/utility/tempData"
import {
    authenticate,
    loadClient,
    loadSubscription,
    initYoutubeClient,
} from '@/utility/youtubeHelper'



function PrimeTime() {
    const resetRef = useRef<Boolean>(false)
    const [auth, setAuth] = useState({})
    const [list, setList] = useState<any>([]) // remove the any later
    const [subscriptions, setSubscriptions] = useState(tempData) //remove tempData to test nextpage

    async function authAndLoadClient() {
        let authData = {}
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
            let data: any = await loadSubscription(token)
            setSubscriptions(data)
        }
        catch (error) {
            console.error('Failed to get subscriptions', error)
        }
    }

    function handleDeselect(data: any) {
        const { channelId } = data
        setList((state: any) => {
            if (isEmpty(state)) {
                return []
            }
            else {
                return state.filter((item: any) => item.channelId !== channelId)
            }
        })
    }

    function handleCreate() {
        authAndLoadClient()
        getSubscription()
    }

    function handleReset() {
        //https://dmitripavlutin.com/react-useref-guide/
        resetRef.current = true
        setList([])
        resetRef.current = false
    }

    function handleSelect(item: any) {
        setList((state: any) => {
            if (isEmpty(state)) {
                return [item]
            }
            else {
                return [...state, item]
            }
        })
    }

    return (
        <View>
            <Script
                id="gapi"
                src="https://apis.google.com/js/api.js"
                strategy="beforeInteractive"
                onLoad={() => { initYoutubeClient() }}
            />
            <div className="container mx-auto px-4">
                <Search />
                <SubscriptionList
                    getSubscription={getSubscription}
                    handleSelect={handleSelect}
                    handleDeselect={handleDeselect}
                    resetRef={resetRef}
                    {...subscriptions}
                />
                {isNotEmpty(list) && <PrimeTimeList list={list} handleReset={handleReset} />}
            </div>
            <button onClick={() => handleCreate()}>Create New Block</button>
        </View>
    )
}

function Search() {
    return (
        <div>
            Search function to be implmented
        </div>
    )
}

export default PrimeTime