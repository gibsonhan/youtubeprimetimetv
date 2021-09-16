import Image from 'next/image'
import { PrimeTimeList as PrimeTimeListInterface } from '../../ts/interface/primeTimeList'
import { isEmpty } from '@/utility/isEmpty'

function PrimeTimeCurrentList(props: PrimeTimeListInterface) {
    const list = props.list

    if (isEmpty(list)) {
        return <div>Loading...</div>
    }
    return (
        <div className="h-24 w-full">
            {
                list.map((ele: any, index: number) => {
                    return <PrimeTimeIcon key={index + ele.channelId} {...ele} />
                })
            }
        </div>
    )
}

function PrimeTimeIcon(props: any) {
    const { channelId, description, title, url } = props

    if (isEmpty(props)) {
        return <div> Loading...</div>
    }
    return (
        <Image
            src={url}
            alt={title + `youtube channel id: ${channelId} + description: ${description}`}
            width={100}
            height={100}
        />
    )
}

export default PrimeTimeCurrentList