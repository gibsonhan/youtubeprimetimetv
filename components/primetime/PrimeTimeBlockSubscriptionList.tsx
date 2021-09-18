import Image from 'next/image'
import { isEmpty } from '@/utility/isEmpty'

function PrimeTimeBlockSubscriptionList(props: any) {
    const list = props.subscriptions

    if (isEmpty(list)) {
        return <div>Loading...</div>
    }
    return (
        <div className='flex flex-row flex-wrap justify-center'>
            {
                list.map((ele: any, index: number) => {
                    return (<SubscriptionIcon key={index} {...ele} />)
                })
            }
        </div>
    )
}

function SubscriptionIcon(props: any) {
    const { channelId, description, url, title } = props
    return (
        <div className="relative h-28 w-28 m-1 rounded-md overflow-hidden">
            <Image
                src={url}
                alt={title + `youtube channel id: ${channelId} + description: ${description}`}
                objectFit="cover"
                layout="fill"
            />
        </div>
    )
}

export default PrimeTimeBlockSubscriptionList
