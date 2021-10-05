export default function YoutubePlayerLayout(props: any) {
    const { top, right, main, bottom, left } = props
    return (
        <div className='relative flex flex-col justify-center items-center'>
            <div className='absolute top-0'>{top}</div>
            <div className='absolute right-0'>{right}</div>
            {main}
            <div className='absolute bottom-0'>{bottom}</div>
            <div className='absolute left-0'>{left}</div>
        </div>
    )
}

