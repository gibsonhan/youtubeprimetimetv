import Script from 'next/script'
import { useEffect, useRef, useState } from 'react';
//component
import SubscriptionList from '@/components/subscription/SubscriptionList';
//helper
import { isEmpty } from '@/utility/isEmpty';
import {
    authenticate,
    loadClient,
    loadSubscription,
    initYoutubeClient,
} from '@/utility/youtubeHelper'

function Youtube(props: any) {
    const [isYTClientLoaded, setIsYTClientLoaded] = useState(false)
    const [auth, setAuth] = useState({})
    const [subscription, setSubscription] = useState()
    const { mySubList, setMySubList } = props

    async function getSubscription(token: string = '') {
        try {
            let data: any = await loadSubscription(token)
            console.log('data', data)
            setSubscription(data)
        }
        catch (error) {
            console.error('Failed to get subscriptions', error)
        }
    }

    function handleSelect(item: any) {
        setMySubList((state: any) => {
            if (isEmpty(state)) {
                return [item]
            }
            else {
                return [...state, item]
            }
        })
    }

    function handleDeselect(data: any) {
        const { channelId } = data
        setMySubList((state: any) => {
            if (isEmpty(state)) {
                return []
            }
            else {
                return state.filter((item: any) => item.channelId !== channelId)
            }
        })
    }

    useEffect(() => {
        if (!isYTClientLoaded) return
        async function handleCreate() {
            await authenticate()
            await loadClient()
            await getSubscription()
        }
        setTimeout(() => {
            handleCreate()
        }, 1000)
    }, [isYTClientLoaded])

    return (
        <>
            <Script
                id="gapi"
                src="https://apis.google.com/js/api.js"
                strategy="beforeInteractive"
                onLoad={async () => {
                    console.log('Loading Youtube Client')
                    await initYoutubeClient()
                    setIsYTClientLoaded(true)
                }}
            />
            <SubscriptionList
                getSubscription={getSubscription}
                handleSelect={handleSelect}
                handleDeselect={handleDeselect}
                selectedList={mySubList}
                resetRef={props.resetRef}
                {...subscription}
            />
        </>
    )
}

export default Youtube