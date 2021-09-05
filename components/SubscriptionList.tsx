import { useRef, useState } from "react"
import { SubscriptionList as SubscriptionListInteface } from "../ts/interface/subscriptionList"
import { isEmpty } from "../utilities/isEmpty"
import { isNotEmpty } from "../utilities/isNotEmpty"
import PrimeTimeList from "./PrimeTimeList"
import SubscriptionIcon from "./SubscriptionIcon"

function SubscriptionList(props: SubscriptionListInteface) {
    const [list, setList] = useState<any>([])
    const resetRef = useRef<Boolean>(false)
    let { items, nextPageToken, prevPageToken, pageInfo, getSubscription } = props

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

    function handleReset() {
        //https://dmitripavlutin.com/react-useref-guide/
        resetRef.current = true
        setList([])
        resetRef.current = false
    }

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

    if (isEmpty(props.items)) {
        return <div className="invisible"></div>
    }

    return (
        <div className="flex flex-col max-w-auto bg-blue-200">
            <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
                {items.map((item, index) =>
                    <SubscriptionIcon
                        key={index + item.snippet.title}
                        deselect={handleDeselect}
                        select={handleSelect}
                        resetRef={resetRef}
                        {...item.snippet}
                    />)
                }
            </div>
            <div className="flex flex-row justify-between">
                <button onClick={() => getSubscription(prevPageToken)}>Previous</button>
                <button onClick={() => getSubscription(nextPageToken)}>Next</button>
            </div>
            {isNotEmpty(list) && <PrimeTimeList list={list} handleReset={handleReset} />}
        </div>
    )
}

export default SubscriptionList