import { isEmpty } from '@/utility/isEmpty'
import Image from 'next/image'
import router, { useRouter } from 'next/router'
import { Pressable } from 'react-native'

function PrimeTimePreviewList(props: any) {
    if (isEmpty(props.primeTimes)) {
        return <>Loading...</>
    }
    const list: any = props.primeTimes
    return (
        <div className="flex flex-col h-full max-w-auto bg-black">
            {
                list.map((item: any, index: any) => {
                    const { id, title, subscriptions } = item
                    return (
                        <PrimeTimePreviewBlock
                            key={index + '_' + title + '_' + id}
                            id={id}
                            subscriptions={subscriptions}
                        />)
                })
            }
        </div>
    )
}

function PrimeTimePreviewBlock(props: any) {
    const list = props.subscriptions
    const id = props.id

    function handlePress(e: any) {
        e.preventDefault()
        const redirect = `/primetime/${id}`
        router.push(redirect)
    }

    function handleLongPress(e: any) {
        e.preventDefault()
        console.log('handle long press')
    }

    return (
        <Pressable
            onPress={(e) => handlePress(e)}
            onLongPress={(e) => handleLongPress(e)}
        >
            <div className="flex flex-row" >
                {
                    list.map((item: any, index: number) => {
                        return (
                            <PrimeTimePreviewIcon
                                key={index + '_' + item.title}
                                {...item}
                            />)
                    })
                }
            </div>
        </Pressable>
    )
}

function PrimeTimePreviewIcon(props: any) {
    const { channelId, description, url, title } = props
    return (
        <Image
            src={url}
            alt={title + `youtube channel id: ${channelId} + description: ${description}`}
            width={150}
            height={150}
        />
    )
}

export default PrimeTimePreviewList