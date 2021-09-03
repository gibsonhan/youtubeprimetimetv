import { SubscriptionList as SubscriptionListInteface } from "../ts/interface/subscriptionList"
import { isEmpty } from "../utilities/isEmpty"
import SubscriptionIcon from "./SubscriptionIcon"

function SubscriptionList(props: SubscriptionListInteface) {
    if (isEmpty(props.items)) {
        return <div className="invisible"></div>
    }

    let { items, nextPageToken, prevPageToken, pageInfo, getSubscription } = props

    return (
        <div className="flex flex-col max-w-auto bg-blue-200">
            <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
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