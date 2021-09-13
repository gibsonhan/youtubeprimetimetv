import axios from 'axios';
import Script from 'next/script';
import { useEffect, useRef, useState } from "react"
import { View } from "react-native"

//component
import PrimeTimeList from '@/components/PrimeTimeList';
import SubscriptionList from '@/components/SubscriptionList';

//helpers
import { isEmpty } from '@/utility/isEmpty';
import { isNotEmpty } from '@/utility/isNotEmpty';
import {
    authenticate,
    loadClient,
    loadSubscription,
    initYoutubeClient,
} from '@/utility/youtubeHelper'



function PrimeTime(props: any) {
    const resetRef = useRef<Boolean>(false)
    const [auth, setAuth] = useState({})
    const [list, setList] = useState<any>([]) // remove the any later
    const [primeTimeId, setPrimeTimeId] = useState('')
    const [subscriptions, setSubscriptions] = useState([]) //remove tempData to test nextpage

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
            console.log(result)
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

    useEffect(() => {
        const { data } = props
        setSubscriptions(data)
    }, [])

    useEffect(() => {
        console.log('what is primetimeId', primeTimeId)
    }, [primeTimeId])

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
                {isNotEmpty(list) && <PrimeTimeList list={list} />}
            </div>
            {isEmpty(primeTimeId) && <button onClick={() => handleCreate()}>Create New Block</button>}
            {isEmpty(primeTimeId) && isNotEmpty(list) && <button onClick={() => handleSave()}> Save </button>}
            {isNotEmpty(primeTimeId) && isNotEmpty(list) && <button onClick={() => handleUpdate()}> Update </button>}
            {isNotEmpty(list) && <button onClick={() => handleReset()}> Reset </button>}
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

export async function getStaticProps() {
    const res = await fetch('http://localhost:3000/api/tempData')
    const result = await res.json()
    return {
        props: {
            data: { ...result.data }
        }
    }
}

export default PrimeTime