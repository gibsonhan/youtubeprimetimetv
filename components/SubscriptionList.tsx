import { useEffect } from "react"
import { SubscriptionList as SubscriptionListInteface } from "../ts/interface/subscriptionList"
import { isEmpty } from "../utilities/isEmpty"
import SubscriptionIcon from "./SubscriptionIcon"

function SubscriptionList(props: SubscriptionListInteface) {
    let {
        items,
        nextPageToken,
        prevPageToken,
        getSubscription,
        handleDeselect,
        handleSelect,
        selectedList,
        resetRef,
    } = props

    if (isEmpty(props.items)) {
        return <div className="invisible"></div>
    }
    function handleIsSelected(id: string) {
        if (isEmpty(selectedList)) {
            return false
        }
        const value = selectedList.some((ele: any) => {
            return ele.channelId === id
        })
        return value
    }

    return (
        <div className="flex flex-col max-w-auto bg-blue-200">
            <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
                {
                    items.map((item, index) => {
                        let id = item.snippet.resourceId.channelId
                        let value = handleIsSelected(id)
                        return <SubscriptionIcon
                            key={index + item.snippet.title}
                            deselect={handleDeselect}
                            select={handleSelect}
                            resetRef={resetRef}
                            hasBeenSelected={value}
                            {...item.snippet}
                        />

                    })
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