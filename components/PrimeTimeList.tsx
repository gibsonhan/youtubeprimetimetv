
import Image from 'next/image'
import { useEffect } from 'react'
import { PrimeTimeList as PrimeTimeListInterface } from '../ts/interface/primeTimeList'
import { isEmpty } from '../utilities/isEmpty'
import { isNotEmpty } from '../utilities/isNotEmpty'


function PrimeTimeList(props: PrimeTimeListInterface) {
    const { list, handleReset } = props
    function savePrimeTimeList() {
        console.log('should save list')
        //save should send a post request to postgres
        //should reset all state from the primeTime List

    }

    return (
        <>
            <div className="h-24 w-full">
                {isNotEmpty(list)
                    && list.map((item: any, index: number) => {
                        return <PrimeTimeIcon key={index + item.channelId} {...item} />
                    })
                }
            </div>
            <button onClick={() => savePrimeTimeList()}> Save </button>
            {isNotEmpty(list) && <button onClick={() => handleReset()}> Reset </button>}
        </>
    )
}

function PrimeTimeIcon(props: any) {
    const { channelId, description, title, url, } = props

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