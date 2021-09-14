import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

function Block(props: any) {
    const router = useRouter()

    useEffect(() => {
        console.log('what is props', props)
    }, [props])

    const { title, description, rank, subscriptions } = props.data
    return (
        <div>
            <Link href="/"> Home </Link>
            <div>{title}</div>
            <div>{description}</div>
            <div>{rank}</div>
            <div className='flex flex-row'>
                {subscriptions.map((ele: any, index: number) => {
                    return (
                        <SubscriptionIcon key={index} {...ele} />
                    )
                })}
            </div>
        </div>
    )
}

function SubscriptionIcon(props: any) {
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

export async function getStaticPaths() {
    //Need to write api & graph ql to only fetch Id resource.
    const response = await fetch('http://localhost:3000/api/primetime')
    const result = await response.json()

    const paths = result.map((item: any) => {
        const { id } = item
        let path = { params: { pid: id } }
        return path
    })

    return { paths, fallback: false }
}

export async function getStaticProps({ params }: any) {
    const response = await fetch(`http://localhost:3000/api/primetime/${params.pid}`)
    const data = await response.json()
    return {
        props: { data }
    }
}

export default Block

