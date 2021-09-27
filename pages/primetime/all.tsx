import CreateNewBlock from "@/components/cat/CreateNewBlock/CreateNewBlock";
import PrimeTimePreviewList from '@/components/primetime/PrimeTimePreviewList';
//helpers

function All(props: any) {
    const primeTimes = props.data.primeTimes

    return (
        <div className='flex flex-col items-center'>
            <PrimeTimePreviewList primeTimes={primeTimes} />
            <CreateNewBlock />
        </div>
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