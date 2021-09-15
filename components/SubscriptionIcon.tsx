import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'

import { SubscriptionIcon as SubscriptionIconInterface } from "../ts/interface/subscriptionIcon"
import { isEmpty } from "../utilities/isEmpty"
import Draggable from './gesture/Dragabble'

function SubscriptionIcon(props: SubscriptionIconInterface) {
    const {
        channelId, //remove
        description,
        title,
        thumbnails,
        resourceId,
        resetRef,
        hasBeenSelected,
        select,
        deselect,
    }: any = props

    const [isSelected, setIsSelected] = useState(hasBeenSelected)
    const { high, medium } = thumbnails
    let defaultThumbnail = thumbnails.default

    const initStyle = "opacity-0"
    const hoverStyle = "hover:opacity-100 hover:bg-gray-400 hover:bg-opacity-50"
    const normalStyle = initStyle + " " + hoverStyle
    const selectedStyle = "opacity-100 bg-gray-400 bg-opacity-70"

    function handleSelect() {
        const { channelId } = resourceId
        const data = {
            channelId,
            description,
            title,
            url: medium.url,
        }
        if (isSelected) {
            deselect(data)
            setIsSelected(false)
        }
        else {
            select(data)
            setIsSelected(true)
        }
    }

    //handle reset of icon
    useEffect(() => {
        if (resetRef.current === true && isSelected) {
            setIsSelected(false)
        }
    }, [resetRef.current])

    return (
        <Pressable onPress={() => handleSelect()}>
            <div className="relative w-24 h-24 bg-gray-200">
                <Image
                    src={medium.url}
                    alt={title + `youtube channel id: ${resourceId.channelId} + description: ${description}`}
                    width={100}
                    height={100}
                />
                <div className={`absolute inset-0 ${isSelected ? selectedStyle : normalStyle}`}>
                    <div className="flex items-center justify-center h-full text-sm text-bold text-center">
                        {title}
                    </div>
                </div>
            </div>
        </Pressable>
    )
}

export default SubscriptionIcon