import Link from 'next/link'
import Input from '@/components/common/Input'
import PrimeTimeSubscriptionList, { default as SubscriptionIcon } from '@/components/primetime/PrimeTimeBlockSubscriptionList'
import UpdatePrimeTimeModal from '@/components/modal/UpdatePrimeTimeModal'

function PrimeTimeBlock(props: any) {
    const { title, description, rank, subscriptions } = props.data
    return (
        <div className="flex flex-col">
            <Input title={'title'} type={'text'} value={title} />
            <Input title={'description'} type={'text'} value={description} />
            <Input title={'rank'} type={'text'} value={rank} />
            <PrimeTimeSubscriptionList subscriptions={subscriptions} />
            <UpdatePrimeTimeModal subscriptions={subscriptions} />
            <Link href="/"> Home </Link>
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

