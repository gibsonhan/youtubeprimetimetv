import { Pressable } from 'react-native'
import router from 'next/router'
import PrimeTimePreviewIcon from '@/components/primetime/PrimeTimePreviewIcon'

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
                            />
                        )
                    })
                }
            </div>
        </Pressable>
    )
}

export default PrimeTimePreviewBlock