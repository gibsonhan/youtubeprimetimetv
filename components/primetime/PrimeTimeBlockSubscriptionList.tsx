import Image from 'next/image'
import { isEmpty } from '@/utility/isEmpty'

function PrimeTimeBlockSubscriptionList(props: any) {
    const list = props.subscriptions

    if (isEmpty(list)) {
        return <div>Loading...</div>
    }
    return (
        <div className='flex flex-row'>
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
        <Image
            src={url}
            alt={title + `youtube channel id: ${channelId} + description: ${description}`}
            width={100}
            height={100}
        />
    )
}

export default PrimeTimeBlockSubscriptionList
