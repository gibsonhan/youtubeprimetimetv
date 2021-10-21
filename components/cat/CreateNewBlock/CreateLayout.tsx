function CreateLayout(props: any) {
    return (
        <div className="flex flex-col flex-grow h-auto justify-center items-center overflow-scroll">
            <div className='flex-auto'>{props.mySubList}</div>
            <div className='flex-grow overflow-auto'>
                {props.main}
            </div>
            <div className='flex flex-inital  w-full justify-evenly'>
                {props.bottom}
            </div>
        </div>
    )
}

export default CreateLayout