function CreateLayout(props: any) {
    return (
        <div className="flex flex-col h-auto justify-center items-center overflow-scroll">
            <div className='flex text-2xl m-8 items-center'>{props.top} </div>
            <div className='flex-1 overflow-auto'>
                {props.main}
            </div>
            <div className='flex w-full justify-evenly'>
                {props.bottom}
            </div>
        </div>
    )
}

export default CreateLayout