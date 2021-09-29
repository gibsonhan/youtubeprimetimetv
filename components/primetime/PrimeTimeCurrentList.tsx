import Image from 'next/image'
import { HiOutlineTrash } from 'react-icons/hi'
//ts
import { PrimeTimeList as PrimeTimeListInterface } from '@ts/interface/primeTimeList'
//helper
import { isEmpty } from '@/utility/isEmpty'
import { isNotEmpty } from '@/utility/isNotEmpty'

function PrimeTimeCurrentList(props: PrimeTimeListInterface) {
    const { handleDeselect, list, handleReset } = props
    return (
        <div className="flex flex-row flex-wrap justify-start">
            {
                list.map((ele: any, index: number) => {
                    return <PrimeTimeIcon key={index} handleDeselect={handleDeselect} {...ele} />
                })
            }
            {isNotEmpty(list) && <ResetIcon handleReset={() => handleReset()} />}
        </div>
    )
}

function PrimeTimeIcon(props: any) {
    const { channelId, description, handleDeselect, title, url } = props

    if (isEmpty(props)) {
        return <div> Loading...</div>
    }

    return (
        <div className="relative h-10 w-10 rounded-sm overflow-hidden" onClick={() => handleDeselect(channelId)}>
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
    const scale = 'transform scale-90'
    const position = 'flex justify-center items-center ml-1'
    const dimension = 'h-10 w-10 rounded-sm overflow-hide'
    const hover = 'hover:scale-100'
    return (
        <div className={`${scale} ${position} ${dimension} ${hover} bg-gray-200`} onClick={() => props.handleReset()}>
            <HiOutlineTrash />
        </div>
    )
}

export default PrimeTimeCurrentList