import { useAtom } from 'jotai'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
//util
import { isEmpty } from "@/utility/isEmpty"
import { getPlayList, getUploadId } from "@/utility/youtubeHelper"
import { isNotEmpty } from "@/utility/isNotEmpty"
import YoutubePlayer from "@/components/youtube/YoutubePlayer"
//youtube
import { alertAtom } from "@store/atom"

export default function Watch() {
    const { query } = useRouter()
    const [_, setAlert] = useAtom(alertAtom)
    const [subList, setSubList] = useState([])
    const [primeTime, setPrimeTime] = useState([])

    //fetch subscription list
    useEffect(() => {
        if (isEmpty(query)) return

        async function getSubscriptionList() {
            const pid = query.block

            const accessToken = document.cookie
                .split('; ')
                .find((row: string) => row.startsWith('accessToken='))
                ?.split('=')[1]

            try {
                const res = await fetch(`http://localhost:3001/primetime/${pid}`, {
                    method: 'GET',
                    headers: {
                        'Access-Control-Allow-Origin': 'http://localhost:3000',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    credentials: 'include',
                })
                const result = await res.json()
                console.log(result)

                if (res.ok) setSubList(result.subscriptions);
                else {
                    const { message } = result
                    throw `${message}`
                }
            }
            catch (error: any) {
                setAlert(error)
            }
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
            <YoutubePlayer videoList={primeTime} />
        </div>
    )
}