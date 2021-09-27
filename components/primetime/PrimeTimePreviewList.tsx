import PrimeTimePreviewBlock from '@/components/primetime/PrimeTimePreviewBlock'
import { isEmpty } from '@/utility/isEmpty'
import Carousel from '@/components/gesture/Carousel'

function PrimeTimePreviewList(props: any) {
    const list: [] = props.primeTimes
    return (
        <div className="flex flex-col h-full max-w-auto bg-black">
            {
                list.map((item: any, index: any) => {
                    const { id, title, subscriptions } = item
                    const key = index + '_' + title + '_' + id
                    return (
                        <Carousel key={key}>
                            <PrimeTimePreviewBlock
                                key={key}
                                id={id}
                                subscriptions={subscriptions}
                            />
                        </Carousel>
                    )
                })
            }
        </div>
    )
}

export default PrimeTimePreviewList