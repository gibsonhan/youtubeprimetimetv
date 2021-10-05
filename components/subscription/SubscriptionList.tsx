import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
//ts
import { SubscriptionList as SubscriptionListInterface } from "@ts/interface/subscriptionList"
//component
import SubscriptionIcon from "@/components/subscription/SubscriptionIcon"
//helper
import { isEmpty } from "@/utility/isEmpty"

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
            <FloatingButton type='left' disable={isEmpty(prevPageToken)} getSubscription={handlePrevClick} />
            <FloatingButton type='right' disable={false} getSubscription={handleNextClick} />
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
    const { type, disable, getSubscription } = props
    //position
    const fixedDirection = type === 'left' ? 'left-0' : 'right-0'
    const position = `flex flex-col fixed z-50 items-center justify-centers bottom-2/4 ${fixedDirection}`
    //box shape and style
    const scale = 'transform scale-100'
    const height = 'h-8'
    const width = 'w-8'
    const shape = `m-1 ${height} ${width} rounded-lg`
    //visual 
    const shadow = 'shadow-lg'
    const opacity = 'opacity-60'
    const color = disable ? 'bg-gray-300' : 'bg-yellow-300'
    //hover
    const hover = 'hover:opacity-100 hover:scale-125'

    const handleOnClick = (e: any) => {
        if (disable) {
            return
        }
        e.preventDefault()
        getSubscription()
    }

    const ReactIcon = {
        left: <AiFillCaretLeft />,
        right: <AiFillCaretRight />
    }

    return (
        <div
            className={`${scale} ${position} ${shape} ${color} ${opacity} ${shadow} ${hover}`}
            onClick={handleOnClick}
        >
            {ReactIcon[type]}
        </div>
    )
}

export default SubscriptionList