import Image from 'next/image'
import { isEmpty } from "@/utility/isEmpty"
import { useEffect } from "react"

function PrimeTimeHome(props: any): any {
    if (isEmpty(props.list)) {
        return <></>
    }
    const subscriptions = props.list
    return (
        <div className="flex flex-row h-60 max-w-auto bg-black" >
            {
                subscriptions.map((item: any, index: any) => {
                    return <PrimeTimePreviewList key={index + '_' + item.title} subscriptionList={item.subscriptions} />
                })
            }
        </div>)
}

function PrimeTimePreviewList(props: any) {
    const list = props.subscriptionList
    return (
        <div className="grid grid-row-5 md:grid-cols-7 lg:grid-cols-10" >
            {list.map((item: any, index: number) => {
                return <PrimeTimePreviewIcon key={index + '_' + item.title} {...item} />
            })}
        </div>
    )
}

function PrimeTimePreviewIcon(props: any) {
    const { channelId, description, url, title } = props
    return (
        <div className="relative w-24 h-24 bg-gray-200">
            <Image
                src={url}
                alt={title + `youtube channel id: ${channelId} + description: ${description}`}
                width={100}
                height={100}
            />
        </div>
    )
}

export default PrimeTimeHome