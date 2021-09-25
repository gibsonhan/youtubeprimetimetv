import { SubscriptionList as SubscriptionListInterface } from "@ts/interface/subscriptionList"
import { isEmpty } from "@/utility/isEmpty"
import Button from "@/components/common/Button"
import SubscriptionIcon from "./SubscriptionIcon"

function SubscriptionList(props: SubscriptionListInterface) {
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
        <>
            <FloatingButton title="<" type='left' disable={isEmpty(prevPageToken)} handleOnClick={handlePrevClick} />
            <FloatingButton title=">" type='right' disable={false} handleOnClick={handleNextClick} />
            <div className="grid grid-cols-5 md:grid-cols-7 lg:grid-cols-10">
                {
                    items.map((item, index) => {
                        let id = item.snippet.resourceId.channelId
                        let value = handleIsSelected(id)
                        return (
                            <SubscriptionIcon
                                key={index + item.snippet.title}
                                deselect={handleDeselect}
                                select={handleSelect}
                                resetRef={resetRef}
                                hasBeenSelected={value}
                                {...item.snippet}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

function FloatingButton(props: any) {
    const type = props.type === 'left' ? 'left-0' : 'right-0'
    const position = 'flex flex-col fixed z-50 items-center justify-center' + ' ' + 'bottom-2/4' + ' ' + type
    const height = 'h-12'
    const width = 'w-12'
    const color = props.disable ? 'bg-gray-300' : 'bg-yellow-300'
    const opacity = 'opacity-70'
    const shape = height + ' ' + width + ' ' + 'rounded-lg'

    const handleOnClick = (e: any) => {
        if (props.disable) {
            return
        }
        e.preventDefault()
        props.handleOnClick()
    }

    return (
        <div
            className={position + ' ' + shape + ' ' + color + ' ' + opacity}
            onClick={handleOnClick}
        >
            {props.title}
        </div>
    )
}

export default SubscriptionList