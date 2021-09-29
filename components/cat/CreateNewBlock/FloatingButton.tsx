import { HiViewGridAdd } from 'react-icons/hi'

function FloatingButton(props: any) {
    const scale = 'transform scale-100'
    const position = 'flex flex-col fixed bottom-3 right-3 z-50 items-center justify-center'
    const height = 'h-12'
    const width = 'w-12'
    const color = 'bg-yellow-300'
    const shape = `${height} ${width} rounded-lg shadow-lg`
    const hover = 'hover:scale-105 hover:cursor-pointer'

    const handleOnClick = (e: any) => {
        e.preventDefault()
        props.handleCAT()
    }

    return (
        <div
            className={`${scale} ${position} ${shape} ${color} ${hover}`}
            onClick={handleOnClick}
        >
            <HiViewGridAdd />
        </div>
    )
}

export default FloatingButton