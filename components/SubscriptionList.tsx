import { useEffect } from "react"
import { SubscriptionList as SubscriptionListInterface } from "../ts/interface/subscriptionList"
import { isEmpty } from "../utilities/isEmpty"
import SubscriptionIcon from "./SubscriptionIcon"

function SubscriptionList(props: SubscriptionListInterface) {
    if (isEmpty(props)) {
        return <div>Loading...</div>
    }

    let { items, nextPageToken, prevPageToken, pageInfo, getSubscription } = props
    useEffect(() => {
        console.log('what is props', props)
    }, [props])
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-5 text-center sm:text-left">
                {items.map((item, index) => <SubscriptionIcon key={index + item.snippet.title} {...item.snippet} />)}
            </div>
            <div className="flex flex-row justify-between">
                <button onClick={() => getSubscription(prevPageToken)}>Previous</button>
                <button onClick={() => getSubscription(nextPageToken)}>Next</button>
            </div>
        </div>
    )
}

export default SubscriptionList