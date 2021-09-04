import { useEffect, useState } from "react"
import { SubscriptionList as SubscriptionListInteface } from "../ts/interface/subscriptionList"
import { isEmpty } from "../utilities/isEmpty"
import SubscriptionIcon from "./SubscriptionIcon"

function SubscriptionList(props: SubscriptionListInteface) {
    const [list, setList] = useState<any>([])
    let { items, nextPageToken, prevPageToken, pageInfo, getSubscription } = props

    function handleSelect(item: any) {
        setList((state: any) => {
            if (isEmpty(state)) {
                return [item]
            }
            else {
                return [...state, item]
            }
        })
    }

    function handleDeselect(data: any) {
        const { channelId } = data
        setList((state: any) => {
            if (isEmpty(state)) {
                return []
            }
            else {
                return state.filter((item: any) => item.channelId !== channelId)
            }
        })
    }

    if (isEmpty(props.items)) {
        return <div className="invisible"></div>
    }

    return (
        <div className="flex flex-col max-w-auto bg-blue-200">
            <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
                {items.map((item, index) =>
                    <SubscriptionIcon
                        key={index + item.snippet.title}
                        select={handleSelect}
                        deselect={handleDeselect}
                        {...item.snippet}
                    />)
                }
            </div>
            <div className="flex flex-row justify-between">
                <button onClick={() => getSubscription(prevPageToken)}>Previous</button>
                <button onClick={() => getSubscription(nextPageToken)}>Next</button>
            </div>
        </div>
    )
}

export default SubscriptionList