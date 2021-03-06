import { Subscription } from 'ts/interface/youtubeHelper'
const apiKey = 'key=AIzaSyD0IA4HnjdbmHGDl9_Q9fY0mlbTB_VzxRs'
//https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window
declare global {
    interface Window {
        gapi: any
    }
}

export async function authenticate() {
    let auth = {}
    let gapi = window.gapi

    try {
        auth = await gapi.auth2.getAuthInstance().signIn({ scope: "https://www.googleapis.com/auth/youtube.readonly" })
        console.log("Sign-in successful");
    }
    catch (error) {
        console.error("Error signing in", error)
    }
    return auth
}

export function getVideoPromise(channel_id: string) {
    const channelId = `channelId=${channel_id}`
    const maxResults = 'maxResults=1'
    const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&${channelId}&${maxResults}&${apiKey}`
    return fetch(url)
}

export async function getVideoList(videoIds: string) {
    const videoId = `videoId=${videoIds}`
    const baseUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=CcontentDetails&${videoId}&${apiKey}`
    const response = await fetch(baseUrl)
    const result = response.json()
    return result
}

// Make sure the client is loaded and sign-in is complete before calling this method.
export async function loadSubscription(pageToken?: string): Promise<Subscription> {
    let data: any = {}
    let gapi = window.gapi
    try {
        //https://developers.google.com/youtube/v3/docs/subscriptions
        let subscriptions = await gapi.client.youtube.subscriptions
        let { result } = await subscriptions.list({
            "part": [
                "contentDetails",
                "id",
                "snippet ",
            ],
            "maxResults": 50, //youtube allows maximum of 50 per page
            "mine": true,
            "order": "relevance",
            "pageToken": pageToken || "",
        })
        data = {
            "nextPageToken": result.nextPageToken || "",
            "prevPageToken": result.prevPageToken || "",
            "pageInfo": { ...result.pageInfo },
            "items": result.items,
        }
    }
    catch (error) {
        console.error("Execute error", error);
    }
    return data
}

export async function loadClient() {
    try {
        let gapi = window.gapi
        let client = gapi.client
        await client.setApiKey("AIzaSyD0IA4HnjdbmHGDl9_Q9fY0mlbTB_VzxRs");
        await client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
        console.log("GAPI client loaded for API");
    }
    catch (error) {
        console.error("Error loading GAPI client for API", error);
    }
}

export async function initYoutubeClient() {
    let gapi = window.gapi
    await gapi.load("client:auth2", {
        callback: function () {
            gapi.auth2.init({
                client_id: "486025064243-8qhej8fb46i3fiird267mn1nrf43753g.apps.googleusercontent.com"
            });
            console.log('gapi.client loaded!')
            return 'hello'
        },
        onerror: function () {
            console.log('gapi.client failed to load!')
        },
        timeout: 5000,
        ontimeout: function () {
            console.log('gapi.client could not load in a timely manner')
        }
    });
}

export async function getUploadId(channelIdQuery: string) {
    const id = `id=${channelIdQuery}`
    const maxResults = 'maxResults=1'
    const url = `https://youtube.googleapis.com/youtube/v3/channels?part=contentDetails&${id}&${maxResults}&${apiKey}`

    const response = await fetch(url)
    const { items } = await response.json()

    return items.map((ele: any) => ({ channelId: ele.id, uploadId: ele.contentDetails.relatedPlaylists.uploads }))
}


export async function getPlayList(uploadId: string) {
    const playlistId = `playlistId=${uploadId}`
    const maxResult = 'maxResults=5'
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&${maxResult}&${playlistId}&${apiKey}`

    const response = await fetch(url)
    const result = await response.json()

    return result
}