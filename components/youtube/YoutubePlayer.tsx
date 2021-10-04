import Script from "next/script"
import { useEffect, useRef, useState } from "react";

export default function YoutubePlayer(props: any) {
    const [isYTIframeLoaded, setIsYTIframeLoaded] = useState(false)
    const [videoQue, setVideoQue] = useState([])
    const playerRef = useRef<any>()
    useEffect(() => {
        if (!isYTIframeLoaded) return
        playerRef.current = new YT.Player('youtube_iframe_player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            playerRefVars: {
                'playsinline': 1
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });

        function onPlayerReady(event: any) {
            console.log('On Ready', event)
            event.target.playVideo();
        }

        function onPlayerStateChange(event: any) {
            changeBorderColor(event.data)
        }
        function changeBorderColor(playerStatus: any) {
            console.log('hello world', playerStatus)
            var color;
            if (playerStatus == -1) {
                color = "#37474F"; // unstarted = gray
            } else if (playerStatus == 0) {
                color = "#FFFF00"; // ended = yellow
            } else if (playerStatus == 1) {
                color = "#33691E"; // playing = green
            } else if (playerStatus == 2) {
                color = "#DD2C00"; // paused = red
            } else if (playerStatus == 3) {
                color = "#AA00FF"; // buffering = purple
            } else if (playerStatus == 5) {
                color = "#FF6DOO"; // video cued = orange
            }
            if (color) {
                document.getElementById('youtube_iframe_player').style.borderColor = color;
            }
        }
        //return () => playerRef.current.destory()
    }, [isYTIframeLoaded])

    function play() {
        playerRef.current.playVideo()
    }

    function stop() {
        playerRef.current.stopVideo()
    }

    async function loadVideos() {
        let videoQue = props.videoList.map((ele: any) => {
            let array = ele.items.map((item: any) => item.snippet.resourceId.videoId)
            return array
        })
        setVideoQue(videoQue)
    }

    async function loadQue() {
        await loadVideos()
        playerRef.current.loadPlaylist(videoQue[0])
    }

    useEffect(() => {
        let player = playerRef.current
        console.log('what is player', player)
    }, [playerRef.current])

    useEffect(() => {
        console.log('what is props', props)
        console.log(videoQue)
    }, [props, videoQue])

    return (
        <div>
            <Script
                id="youtube_iframe"
                src="https://www.youtube.com/iframe_api"
                strategy="beforeInteractive"
                onLoad={() => setIsYTIframeLoaded(true)}
            />
            <button onClick={() => play()}>Play</button>
            <button onClick={() => stop()}>Stop</button>
            <button onClick={() => loadQue()}>Load Videos</button>
            <iframe id="youtube_iframe_player"
                width="640" height="360"
                src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1"
                frameBorder="1"
            ></iframe>
        </div>
    )
}