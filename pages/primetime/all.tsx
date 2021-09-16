import { useEffect, useState } from "react"
import { View } from 'react-native'
//components
import CreatePrimeTimeModal from '@/components/modal/CreatePrimeTimeModal';
import PrimeTimePreviewList from '@/components/primetime/PrimeTimePreviewList';
//helpers
import { isEmpty } from "@/utility/isEmpty";

function All(props: any) {
    const primeTimes = props.data.primeTimes

    if (isEmpty(primeTimes)) {
        return <div>Loading...</div>
    }
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