import { useEffect } from 'react'
//components
import DeleteBlock from '@/components/cat/DeleteBlock/DeleteBlock'
import { default as Input } from '@/components/cat/UpdateInput/UpdateInput'
import { default as InputTag } from '@/components/cat/UpdateInput/UpdateInputTag'
import UpdateBlock from '@/components/cat/UpdateSubscriptions/UpdateSubscriptions'
import { default as CurrentSubscriptionList } from '@/components/primetime/PrimeTimeBlockSubscriptionList'

function PrimeTimeBlock(props: any) {
    const { id, title, description, rank, shared, subscriptions, tags } = props.data
    const numSubscription = subscriptions.length

    const inputTable = [
        { title: 'title', type: 'text', value: title },
        { title: 'description', type: 'text', value: description },
        { title: 'tags', type: 'text', value: tags },
        { title: 'rank', type: 'text', value: rank }
    ]

    useEffect(() => {
        console.log('what is props', props)
    }, [props])

    return (
        <div className="flex flex-col items-center h-auto my-4 overflow-auto">
            {
                inputTable.map((ele, index) => {
                    const { title } = ele
                    return (title === 'tags')
                        ? <InputTag key={index} id={id} {...ele} />
                        : <Input key={index} id={id} {...ele} />

                })
            }
            <div>{`${numSubscription} in this block`}</div>
            <CurrentSubscriptionList subscriptions={subscriptions} />
            <UpdateBlock id={id} subscriptions={subscriptions} title={title} />
            <DeleteBlock id={id} />
        </div>
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

export default PrimeTimeBlock

