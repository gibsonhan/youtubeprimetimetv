import { useRouter } from "next/router"
import { useEffect, useState } from "react"
//util
import { getVideoPromise } from "@/utility/youtubeHelper"
import { isEmpty } from "@/utility/isEmpty"
import { isNotEmpty } from "@/utility/isNotEmpty"

export default function Watch(props: any) {
    const [primetime, setPrimeTime] = useState([])
    const [subList, setSubList] = useState([])
    const { query } = useRouter()

    //fetch data
    useEffect(() => {
        if (isEmpty(query)) return

        async function getSubscriptionList() {
            const pid = query.block
            const response: any = await fetch(`/api/primetime/${pid}`)
            const { subscriptions } = await response.json()
            setSubList(subscriptions)
        }

        getSubscriptionList()
    }, [query])

    useEffect(() => {
        if (isEmpty(subList)) return
        generatePrimeTime()
    }, [subList])

    async function generatePrimeTime() {
        const videoPromise = subList.map((ele: any) => getVideoPromise(ele.channelId))
        Promise.all(videoPromise).then((value: any) => setPrimeTime(value))
    }

    return (
        <>
            <div>Hello</div>
        </>
    )
}