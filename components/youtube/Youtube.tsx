import Script from 'next/script'
import { useEffect, useRef, useState } from 'react';
//component
import Button from '@/components/common/Button'
import PrimeTimeCurrentList from '@/components/primetime/PrimeTimeCurrentList';
import SubscriptionList from '@/components/subscription/SubscriptionList';
//helper
import { isEmpty } from '@/utility/isEmpty';
import { isNotEmpty } from '@/utility/isNotEmpty';
import {
    authenticate,
    loadClient,
    loadSubscription,
    initYoutubeClient,
} from '@/utility/youtubeHelper'

function Youtube(props: any) {
    const resetRef = useRef<Boolean>(false)
    const [isYTClientLoaded, setIsYTClientLoaded] = useState(false)
    const [auth, setAuth] = useState({})
    const [mySublist, setMySubList] = useState<any>([]) // remove the any later
    const [primeTimeId, setPrimeTimeId] = useState('')
    const [subscription, setSubscription] = useState()

    async function getSubscription(token: string = '') {
        try {
            let data: any = await loadSubscription(token)
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

    async function handleReset() {
        //https://dmitripavlutin.com/react-useref-guide/
        resetRef.current = true
        setMySubList([])
        setTimeout(() => {
            resetRef.current = false
        }, 0)
    }

    useEffect(() => {
        setPrimeTimeId(props.id)
    }, [props.id])

    useEffect(() => {
        if (isNotEmpty(props.list)) {
            setMySubList(props.list)
        }
    }, [props.list])

    useEffect(() => {
        if (isNotEmpty(mySublist) && !!props.currSubRef) {
            props.currSubRef.current = mySublist
        }
    }, [mySublist])

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
        <div className="flex flex-col items-center">
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
            <PrimeTimeCurrentList
                list={mySublist}
                handleReset={() => handleReset()}
            />
            <SubscriptionList
                getSubscription={getSubscription}
                handleSelect={handleSelect}
                handleDeselect={handleDeselect}
                selectedList={mySublist}
                resetRef={resetRef}
                {...subscription}
            />
        </div>
    )
}

export default Youtube