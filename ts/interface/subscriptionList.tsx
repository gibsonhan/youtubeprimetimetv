import { Token } from "../type/subscriptonList";

interface ContentDetail {
    totalItemCount: number,
    newItemCount: number,
    activityType: string,
}

interface PageInfo {
    totalResults: number,
    resultsPerPage: 50,
}

interface Item {
    contentDetails: ContentDetail
    etag: string
    id: string
    kind: string
    snippet: Snippet
}

interface ResourceId {
    channelId: string
    kind: string
}

export interface Snippet {
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

interface Subscription {
    items: Array<Item>,
    nextPageToken: Token,
    prevPageToken: Token,
    pageInfo: PageInfo,
}

interface Url {
    url: string
}

export interface SubscriptionList extends Subscription {
    getSubscription(token?: string): Promise<Subscription>
}
