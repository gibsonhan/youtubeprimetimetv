import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Pressable } from 'react-native'

import { SubscriptionIcon as SubscriptionIconInterface } from "../ts/interface/subscriptionIcon"
import { isEmpty } from "../utilities/isEmpty"
import Draggable from './gesture/Dragabble'

function SubscriptionIcon(props: SubscriptionIconInterface) {
    const [isSelected, setIsSelected] = useState(false)

    if (isEmpty(props)) {
        return <div> Loading </div>
    }

    let { channeldId, description, title, thumbnails }: any = props
    let { high, medium } = thumbnails
    let defaultThumbnail = thumbnails.default

    function handleSelect() {
        setIsSelected(props => {
            return !props
        })
    }
    const initStyle = "opacity-0"
    const hoverStyle = "hover:opacity-100 hover:bg-gray-400 hover:bg-opacity-50"
    const normalStyle = initStyle + " " + hoverStyle
    const selectedStyle = "opacity-100 bg-gray-400 bg-opacity-70"

    return (
        <Pressable onPress={() => handleSelect()}>
            <div className="relative w-24 h-24 bg-gray-200">
                <Image
                    src={medium.url}
                    alt={title + `youtube channel id: ${channeldId} + description: ${description}`}
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