interface PageInfo {
    "totalResults": number,
    "resultsPerPage": number
}

export interface Subscription {
    nextPageToken: string
    prevPageToken: string
    pageInfo: PageInfo,
    items: {}
    error?: string
}

