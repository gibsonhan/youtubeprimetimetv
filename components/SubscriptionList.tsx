import { useEffect } from "react"
import { SubscriptionList as SubscriptionListInteface } from "../ts/interface/subscriptionList"
import { isEmpty } from "../utilities/isEmpty"
import Button from "./common/Button"
import SubscriptionIcon from "./subscription/SubscriptionIcon"

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

    //function returns value for hasBeenSelected.
    //On reload of same page, if icon has been selected, return true
    //This allows Subscription Icon Style to update correct style on rerender. 
    function handleIsSelected(id: string) {
        if (isEmpty(selectedList)) {
            return false
        }
        const value = selectedList.some((ele: any) => {
            return ele.channelId === id
        })
        return value
    }

    const handlePrevClick = () => getSubscription(prevPageToken)
    const handleNextClick = () => getSubscription(nextPageToken)

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
                <Button title={'Previous'} disable={isEmpty(prevPageToken)} isVisible={true} handleClick={handlePrevClick} />
                <Button title={'Next'} disable={false} isVisible={true} handleClick={handleNextClick} />
            </div>
        </div>
    )
}

export default SubscriptionList