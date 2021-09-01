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
        <div className="text-center">
            <Image
                src={medium.url}
                alt={title + `youtube channel id: ${channeldId} + description: ${description}`}
                width={100}
                height={100}
            />
            <div>{title}</div>
        </div>
    )
}

export default SubscriptionIcon