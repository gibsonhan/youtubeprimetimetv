interface Url {
    url: string
}

interface ResourceId {
    channelId: string
    kind: string
}

export interface SubscriptionIcon {
    data: {
        channelId: string,
        description: string,
        publishedAt: string,
        resourceId: ResourceId,
        thumbnails: {
            default: Url
            medium: Url
            high: Url
        },
        title: string,
    }
}