import Image from 'next/image'
import { PrimeTimeList as PrimeTimeListInterface } from '../../ts/interface/primeTimeList'
import { isEmpty } from '@/utility/isEmpty'

function PrimeTimeCurrentList(props: PrimeTimeListInterface) {
    const list = props.list

    if (isEmpty(list)) {
        return <div>Select your favorite youtubers</div>
    }
    return (
        <div className="flex flex-row flex-wrap justify-start">
            {
                list.map((ele: any, index: number) => {
                    return <PrimeTimeIcon key={index + ele.channelId} {...ele} />
                })
            }
            <ResetIcon handleReset={() => props.handleReset()} />
        </div>
    )
}

function PrimeTimeIcon(props: any) {
    const { channelId, description, title, url } = props

    if (isEmpty(props)) {
        return <div> Loading...</div>
    }
    return (
        <div className="relative h-10 w-10 rounded-sm overflow-hidden">
            <Image
                src={url}
                alt={title + `youtube channel id: ${channelId} + description: ${description}`}
                layout="fill"
                objectFit="cover"
            />
        </div>
    )
}

function ResetIcon(props: any) {
    return (
        <div className="flex justify-center items-center h-10 w-10 rounded-sm bg-gray-200 text-sm" onClick={() => props.handleReset()}>
            Reset
        </div>
    )
}

export default PrimeTimeCurrentList