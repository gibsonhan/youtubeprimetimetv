import CreateNewBlock from "@/components/cat/CreateNewBlock/CreateNewBlock";
import PrimeTimePreviewList from '@/components/primetime/PrimeTimePreviewList';
import { useEffect } from "react";
//helpers

function All(props: any) {
    const primeTimes = props.data.primeTimes
    if (!!primeTimes.message) return null
    return (
        <div className='flex flex-col items-center'>
            <PrimeTimePreviewList primeTimes={primeTimes} />
            <CreateNewBlock />
        </div>
    )
}

export async function getStaticProps() {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3RVc2VyMSIsImlhdCI6MTYzNDExOTU5NiwiZXhwIjoxNjM0MTIzMTk2fQ.lejmrqpAL9i4dZFLfH9q_S0FjRcqqvXY81CnH0oSPPM'

    const response = await fetch('http://localhost:3001/primetime', {
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    const result = await response.json()

    return {
        props: {
            data: { primeTimes: result }
        }
    }
}

export default All