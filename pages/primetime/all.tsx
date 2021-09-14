
import Script from 'next/script'
import { useEffect, useState } from "react"
import { Modal, View } from 'react-native'
//components
import PrimeTimePreviewList from '@/components/PrimeTimePreviewList';
//helpers
import { isNotEmpty } from "@/utility/isNotEmpty"
import CreatePrimeTimeModal from '@/components/modal/CreatePrimeTimeModal';

function All(props: any) {
    const [primeTimes, setPrimeTimes] = useState([])

    useEffect(() => {
        const { data } = props
        if (isNotEmpty(data)) {
            setPrimeTimes(data.primeTimes)
        }
    }, [props])

    return (
        <View>
            <PrimeTimePreviewList primeTimes={primeTimes} />
            <CreatePrimeTimeModal />
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