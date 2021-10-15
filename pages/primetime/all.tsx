import CreateNewBlock from "@/components/cat/CreateNewBlock/CreateNewBlock";
import PrimeTimePreviewList from '@/components/primetime/PrimeTimePreviewList';
import { useEffect } from "react";
import { AiOutlineConsoleSql } from "react-icons/ai";
//helpers

function All(props: any) {
    const primeTimes = props.data.primeTimes
    console.log(document?.cookie)
    useEffect(() => {
        console.log(props)
    }, [props])
    if (!!primeTimes?.message) return null
    return (
        <div className='flex flex-col items-center'>
            <PrimeTimePreviewList primeTimes={primeTimes} />
            <CreateNewBlock />
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const cookie = context.req ? context.req.headers.cookie : undefined
    console.log('what is cookie', cookie)
    const accessToken = cookie.split('=')[1]

    const response = await fetch('http://localhost:3001/primetime', {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Cookie': cookie
        },
        credentials: 'include',
    })
    const result = await response.json()

    return {
        props: {
            data: { result }
        }
    }
}

export default All