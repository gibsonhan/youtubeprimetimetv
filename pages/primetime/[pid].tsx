import router, { useRouter } from 'next/router'
//components
import Button from '@/components/common/Button'
import DeleteBlock from '@/components/cat/DeleteBlock/DeleteBlock'
import { default as Input } from '@/components/updateInput/UpdateInput'
import { default as InputTag } from '@/components/updateInput/UpdateInputTag'
import { default as CurrentSubscriptionList } from '@/components/primetime/PrimeTimeBlockSubscriptionList'
import UpdateBlock from '@/components/cat/UpdateSubscriptions/UpdateSubscriptions'
import { useEffect } from 'react'

function PrimeTimeBlock(props: any) {
    const router = useRouter()
    const { pid } = router.query
    useEffect(() => { console.log(props) }, [])
    //const numSubscription = subscriptions.length
    if (!!props.data.message) return <></>
    const { id, title, description, tags, rank, subscriptions } = props.data
    const numSubscription = subscriptions.length
    const inputTable = [
        { title: 'title', type: 'text', value: title },
        { title: 'description', type: 'text', value: description },
        { title: 'tags', type: 'text', value: tags },
        { title: 'rank', type: 'text', value: rank }
    ]

    return (
        <div className="flex flex-col items-center h-auto my-4 overflow-auto">
            {
                inputTable.map((ele, index) => {
                    return (ele.title === 'tags')
                        ? <InputTag key={index} id={id} {...ele} />
                        : <Input key={index} id={id} {...ele} />

                })
            }
            <div>{`${numSubscription} in this block`}</div>
            <CurrentSubscriptionList subscriptions={subscriptions} />
            <UpdateBlock id={id} subscriptions={subscriptions} title={title} />
            <DeleteBlock id={id} />
            <Button title="watch" disable={false} isVisible={true} handleClick={() => router.push(`/primetime/watch?block=${id}`)} />
        </div>
    )
}

export async function getServerSideProps(ctx: any) {
    const cookie = ctx.req ? ctx.req.headers.cookie : undefined
    const { pid } = ctx.query
    const accessToken = cookie
        .split('; ')
        .find((row: string) => row.startsWith('accessToken'))
        ?.split('=')[1];

    const url = `http://localhost:3001/primetime/${pid}`
    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
    const data: any = await res.json()

    return {
        props: { data }
    }
}

export default PrimeTimeBlock
