import Script from "next/script"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
//util
import { isEmpty } from "@/utility/isEmpty"
import { getPlayList, getUploadId } from "@/utility/youtubeHelper"
//youtube

export default function Watch() {
    const { query } = useRouter()
    const [subList, setSubList] = useState([])
    const [uploadId, setUploadId] = useState([])
    const [primeTime, setPrimeTime] = useState([])

    //fetch subscription list
    useEffect(() => {
        if (isEmpty(query)) return

        async function getSubscriptionList() {
            const pid = query.block
            const response: any = await fetch(`/api/primetime/${pid}`)
            const data = await response.json()
            console.log(data)
            setSubList(data.subscriptions)
        }

        getSubscriptionList()
    }, [query])

    async function getUploadIdList() {
        const channelId = subList.map((ele: any) => ele.channelId)
        const channelIdQuery = channelId.toString()
        const result = await getUploadId(channelIdQuery)
        setUploadId(result)
    }

    async function getAllUpload() {
        let promiseArr = uploadId.map((ele: any) => getPlayList(ele.uploadId))
        let result: any = await Promise.all(promiseArr)
        setPrimeTime(result)
    }

    return (
        <div className='flex flex-col'>
            <div>Hello</div>
            <button onClick={() => getUploadIdList()}>uploads</button>
            <br></br>
            <button onClick={() => getAllUpload()}>Playlist</button>
        </div>
    )
}