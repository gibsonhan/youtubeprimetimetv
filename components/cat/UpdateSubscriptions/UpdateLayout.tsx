function UpdateLayout(props: any) {
    return (
        <div className="flex flex-col h-full justify-center items-center">
            <div className='flex-none flex text-2xl m-8 items-center'>{props.top} </div>
            <div className='flex-1'>{props.currSubList}</div>
            <div className='flex-grow flex flex-col items-center overflow-scroll'>
                {props.main}
            </div>
            <div className='flex-none flex w-full justify-evenly'>
                {props.bottom}
            </div>
        </div>
    )
}

export default UpdateLayout