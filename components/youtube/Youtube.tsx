import Script from 'next/script'
import { useEffect, useRef, useState } from 'react';
//component
import PrimeTimeList from '@/components/PrimeTimeList';
import SubscriptionList from '@/components/SubscriptionList';
//helper
import { isEmpty } from '@/utility/isEmpty';
import { isNotEmpty } from '@/utility/isNotEmpty';
import {
    authenticate,
    loadClient,
    loadSubscription,
    initYoutubeClient,
} from '@/utility/youtubeHelper'
import { View } from 'react-native';


function Youtube() {
    const resetRef = useRef<Boolean>(false)
    const [auth, setAuth] = useState({})
    const [list, setList] = useState<any>([]) // remove the any later
    const [primeTimeId, setPrimeTimeId] = useState('')
    const [subscription, setSubscription] = useState()

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
            setSubscription(data)
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

    async function handleCreate() {
        await authAndLoadClient()
        await getSubscription()
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
            title: 'fjoewajfoejawo',
            description: 'afoiejwaofjeoiwj',
            userId: '2joiej1odj3oij1243',
            rank: 7,
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

        console.log('update', data)
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
            <SubscriptionList
                getSubscription={getSubscription}
                handleSelect={handleSelect}
                handleDeselect={handleDeselect}
                resetRef={resetRef}
                {...subscription}
            />
            {isNotEmpty(list) && <PrimeTimeList list={list} />}
            {isEmpty(primeTimeId) && <button onClick={() => handleCreate()}>Create New Block</button>}
            {isEmpty(primeTimeId) && isNotEmpty(list) && <button onClick={() => handleSave()}> Save </button>}
            {isNotEmpty(primeTimeId) && isNotEmpty(list) && <button onClick={() => handleUpdate()}> Update </button>}
            {isNotEmpty(list) && <button onClick={() => handleReset()}> Reset </button>}
        </View>
    )
}

export default Youtube