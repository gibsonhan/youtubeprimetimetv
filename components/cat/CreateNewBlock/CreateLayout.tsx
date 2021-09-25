function CreateLayout(props: any) {
    return (
        <div className="flex flex-col h-auto justify-center items-center overflow-scroll">
            <div className='flex-auto'>{props.mySubList}</div>
            <div className='flex-grow overflow-auto'>
                {props.main}
            </div>
            <div className='flex-none flex w-full justify-evenly'>
                {props.bottom}
            </div>
        </div>
    )
}

export default CreateLayout