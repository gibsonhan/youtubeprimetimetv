import Link from 'next/Link';
import Image from 'next/image'
import { Pressable } from 'react-native'

function PrimeTimePreviewList(props: any) {
    const list = props.subscriptions
    const id = props.id
    return (
        <Pressable
            onPress={() => console.log('hello world')}
            onLongPress={() => console.log('long press')}
            onHoverIn={() => console.log('hover me')}
            onHoverOut={() => console.log('hover out')}
        >
            <Link href={`/primetime/${id}`}>
                <div className="flex flex-row" >
                    {
                        list.map((item: any, index: number) => {
                            return (
                                <PrimeTimePreviewIcon
                                    key={index + '_' + item.title}
                                    {...item}
                                />
                            )
                        })
                    }
                </div>
            </Link>
        </Pressable>
    )
}

function PrimeTimePreviewIcon(props: any) {
    const { channelId, description, url, title } = props
    return (
        <Image
            src={url}
            alt={title + `youtube channel id: ${channelId} + description: ${description}`}
            width={100}
            height={100}
        />
    )
}

export default PrimeTimePreviewList