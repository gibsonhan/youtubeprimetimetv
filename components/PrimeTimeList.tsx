
import Image from 'next/image'
import { PrimeTimeList as PrimeTimeListInterface } from '../ts/interface/primeTimeList'
import { isEmpty } from '../utilities/isEmpty'
import { isNotEmpty } from '../utilities/isNotEmpty'

function PrimeTimeList(props: PrimeTimeListInterface) {
    const { list } = props
    return (
        <div className="h-24 w-full">
            {isNotEmpty(list)
                && list.map((item: any, index: number) => {
                    return <PrimeTimeIcon key={index + item.channelId} {...item} />
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

export default PrimeTimeList