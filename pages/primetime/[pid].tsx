import Input from '@/components/common/Input'
import PrimeTimeSubscriptionList from '@/components/primetime/PrimeTimeBlockSubscriptionList'
import UpdateBlock from '@/components/cat/UpdateSubscriptions/UpdateSubscriptions'
import DeleteBlock from '@/components/cat/DeleteBlock/DeleteBlock'

function PrimeTimeBlock(props: any) {
    const { id, title, description, rank, subscriptions } = props.data
    const numSubscription = subscriptions.length

    return (
        <div className="flex flex-col items-center h-auto my-4 overflow-auto">
            <Input title={'title'} type={'text'} value={title} />
            <Input title={'description'} type={'text'} value={description} />
            <Input title={'rank'} type={'text'} value={rank} />
            <div>{`${numSubscription} in this block`}</div>
            <PrimeTimeSubscriptionList subscriptions={subscriptions} />
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

