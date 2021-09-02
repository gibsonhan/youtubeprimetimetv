import Image from 'next/image'
import { SubscriptionIcon as SubscriptionIconInterface } from "../ts/interface/subscriptionIcon"
import { isEmpty } from "../utilities/isEmpty"

function SubscriptionIcon(props: SubscriptionIconInterface) {
    if (isEmpty(props)) {
        return <div> Loading </div>
    }

    let { channeldId, description, title, thumbnails }: any = props
    let { high, medium } = thumbnails
    let defaultThumbnail = thumbnails.default

    return (
        <div className="relative w-24 h-24 bg-gray-200">
            <Image
                src={medium.url}
                alt={title + `youtube channel id: ${channeldId} + description: ${description}`}
                width={100}
                height={100}
            />
            <div className="opacity-0 absolute inset-0 hover:opacity-100 hover:bg-gray-400 hover:bg-opacity-50">
                <div className="flex items-center justify-center h-full text-sm text-bold text-center">
                    {title}
                </div>
            </div>
        </div>
    )
}

export default SubscriptionIcon