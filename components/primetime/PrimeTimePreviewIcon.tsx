import Image from 'next/image'

function PrimeTimePreviewIcon(props: any) {
    const { channelId, description, url, title } = props
    return (
        <Image
            src={url}
            alt={title + `youtube channel id: ${channelId} + description: ${description}`}
            width={150}
            height={150}
        />
    )
}

export default PrimeTimePreviewIcon