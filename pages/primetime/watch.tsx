import { useRouter } from "next/router"
import { useEffect, useState } from "react"
//util
import { getVideoList, getVideoPromise } from "@/utility/youtubeHelper"
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
        const result = await Promise.all(videoPromise)
        console.log('result', result)
        //const videoIds = await videoIdToString(result)
        //const videoList = await getVideoList(videoIds)
        //setPrimeTime(videoList)
    }

    async function videoIdToString(data: any) {
        let string = ''
        data.forEach((ele: any) => {
            //string += ele.items[0].videoId + '%'
        })
        return string.slice(0, -1)
    }

    return (
        <>
            <div>Hello</div>
        </>
    )
}