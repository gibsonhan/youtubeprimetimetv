import Script from "next/script"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
//util
import { isEmpty } from "@/utility/isEmpty"
import { getPlayList, getUploadId } from "@/utility/youtubeHelper"
import { isNotEmpty } from "@/utility/isNotEmpty"
import YoutubePlayer from "@/components/youtube/YoutubePlayer"
//youtube

export default function Watch() {
    const { query } = useRouter()
    const [subList, setSubList] = useState([])
    const [primeTime, setPrimeTime] = useState([])

    //fetch subscription list
    useEffect(() => {
        if (isEmpty(query)) return

        async function getSubscriptionList() {
            const pid = query.block
            const response: any = await fetch(`/api/primetime/${pid}`)
            const data = await response.json()
            setSubList(data.subscriptions)
        }
        getSubscriptionList()

    }, [query])

    async function getUploadIdList() {
        const channelId = subList.map((ele: any) => ele.channelId)
        const channelIdQuery = channelId.toString()
        return await getUploadId(channelIdQuery)
    }

    async function getAllUpload() {
        const uploadId: any = await getUploadIdList()
        const promiseArr = uploadId.map((ele: any) => getPlayList(ele.uploadId))
        const result: any = await Promise.all(promiseArr)
        setPrimeTime(result)
    }

    useEffect(() => {
        if (isEmpty(subList)) return
        if (isNotEmpty(primeTime)) return
        getAllUpload()
    }, [subList])

    return (
        <div className='flex flex-col'>
            <button onClick={() => getAllUpload()}>Playlist</button>
            <YoutubePlayer videoList={primeTime} />
        </div>
    )
}