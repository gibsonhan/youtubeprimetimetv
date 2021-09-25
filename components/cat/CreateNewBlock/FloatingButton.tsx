function FloatingButton(props: any) {
    const position = 'flex flex-col fixed bottom-3 right-3 z-50 items-center justify-center'
    const height = 'h-12'
    const width = 'w-12'
    const color = 'bg-yellow-300'
    const shape = height + ' ' + width + ' ' + 'rounded-lg'

    const handleOnClick = (e: any) => {
        e.preventDefault()
        props.handleCAT()
    }

    return (
        <div
            className={position + ' ' + shape + ' ' + color}
            onClick={handleOnClick}
        >
            {'+'}
        </div>
    )
}

export default FloatingButton