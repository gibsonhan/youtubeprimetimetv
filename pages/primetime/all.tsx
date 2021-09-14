
import { useEffect, useState } from "react"
import { View } from 'react-native'
//components
import PrimeTimePreviewList from '@/components/PrimeTimePreviewList';
//helpers
import { isNotEmpty } from "@/utility/isNotEmpty"

function All(props: any) {
    const [primeTimeList, setPrimeTimeList] = useState([])

    useEffect(() => {
        const { data } = props
        if (isNotEmpty(data)) {
            setPrimeTimeList(data.primeTimes)
        }
    }, [props])

    return (
        <View>
            <div className="flex flex-col h-60 max-w-auto bg-black" >
                {
                    primeTimeList.map((item: any, index: any) => {
                        const { id, title, subscriptions } = item
                        return (
                            <PrimeTimePreviewList
                                key={index + '_' + title + '_' + id}
                                id={id}
                                subscriptions={subscriptions}
                            />
                        )
                    })
                }
            </div>
        </View>
    )
}

export async function getStaticProps() {
    const response = await fetch('http://localhost:3000/api/primetime')
    const result = await response.json()

    return {
        props: {
            data: { primeTimes: result }
        }
    }
}

export default All