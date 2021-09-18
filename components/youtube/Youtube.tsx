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
    const [list, setList] = useState<any>([]) // remove the any later
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
        setList((state: any) => {
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
        setList((state: any) => {
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
        setList([])
        setTimeout(() => {
            resetRef.current = false
        }, 0)
    }

    async function handleSave() {
        if (isEmpty(list)) {
            return
        }
        let data: any = {
            title: 'fjoewajfoejawo',
            description: 'afoiejwaofjeoiwj',
            userId: '2joiej1odj3oij1243',
            rank: 7,
            subscriptions: list,
        }

        const resObject = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
        try {
            const response = await fetch('/api/primetime', resObject)
            const result = await response.json()
            setPrimeTimeId(result.id)
        }
        catch (error) {
            console.error('Internal Server Error', error)
        }
    }

    async function handleUpdate() {
        if (isEmpty(primeTimeId)) {
            return
        }

        if (isEmpty(list)) {
            return
        }
        let data: any = {
            id: primeTimeId,
            subscriptions: list,
        }

        const resObject = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        try {
            const response = await fetch('/api/primetime', resObject)
            data = await response.json()
        }
        catch (error) {
            console.error('Internal Server Error', error)
        }
    }

    useEffect(() => {
        setPrimeTimeId(props.id)
    }, [props.id])

    useEffect(() => {
        if (isNotEmpty(props.list)) {
            setList(props.list)
        }
    }, [props.list])

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
            <PrimeTimeCurrentList list={list} />
            <Button
                title={'update'}
                disable={isEmpty(subscription)}
                isVisible={isNotEmpty(primeTimeId) && isNotEmpty(list) && isNotEmpty(subscription)}
                handleClick={handleUpdate}
            />
            <SubscriptionList
                getSubscription={getSubscription}
                handleSelect={handleSelect}
                handleDeselect={handleDeselect}
                selectedList={list}
                resetRef={resetRef}
                {...subscription}
            />
            <Button
                title={'save'}
                disable={false}
                isVisible={isEmpty(primeTimeId) && isNotEmpty(list)}
                handleClick={handleSave}
            />
            <Button
                title={'reset'}
                disable={false}
                isVisible={isEmpty(primeTimeId) && isNotEmpty(list)}
                handleClick={handleReset}
            />
        </div>
    )
}

export default Youtube