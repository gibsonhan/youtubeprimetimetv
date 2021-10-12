import Script from "next/script"
import { useEffect, useRef, useState } from "react";
//components
import { default as Layout } from '@/components/youtube/YoutubePlayerLayout'
import { default as Button } from "@/components/youtube/YoutubePlayerButton";
//util
import { isEmpty } from "@/utility/isEmpty";

export default function YoutubePlayer(props: any) {
    const [isYTIframeLoaded, setIsYTIframeLoaded] = useState(false)
    const [videoQue, setVideoQue] = useState([])
    const [videoQueSize, setVideoQueSize] = useState(0)
    const [videoQueIndex, setVideoQueIndex] = useState(0)
    const playerRef = useRef<any>()

    function play() {
        if (!playerRef.current) return
        playerRef.current.playVideo()
    }

    function stop() {
        if (!playerRef.current) return
        playerRef.current.stopVideo()
    }

    async function loadVideos() {
        let videoQue = props.videoList.map((ele: any) => {
            let array = ele.items.map((item: any) => item.snippet.resourceId.videoId)
            return array
        })
        setVideoQueSize(videoQue.length)
        setVideoQue(videoQue)
    }

    async function loadQue() {
        if (!playerRef.current) return
        playerRef.current.cuePlaylist(videoQue[videoQueIndex])
    }

    function updateIndex(type: string) {
        const lastIndex = videoQueSize - 1;
        (type === 'next')
            ? setVideoQueIndex((index: any) => ((index === lastIndex) ? 0 : index + 1))
            : setVideoQueIndex((index: any) => ((index === 0) ? lastIndex : index - 1))
    }

    function updatePlaylistVideo(type: string) {
        if (!playerRef.current) return
        (type === 'next')
            ? playerRef.current.nextVideo('loop')
            : playerRef.current.previousVideo('loop')
    }

    useEffect(() => {
        console.log('hello', props.vidoeList)
        if (isEmpty(props.videoList)) return
        loadVideos()
    }, [props.videoList])

    useEffect(() => {
        if (isEmpty(videoQue)) return
        loadQue()
    }, [videoQue])

    useEffect(() => {
        if (isEmpty(videoQue)) return
        loadQue()
    }, [videoQueIndex])

    const Content = {
        top: <Button type='top' handleOnClick={() => updateIndex('next')} />,
        bottom: <Button type='bottom' handleOnClick={() => updateIndex('prev')} />,
        right: <Button type='right' handleOnClick={() => updatePlaylistVideo('next')} />,
        left: <Button type='left' handleOnClick={() => updatePlaylistVideo('prev')} />,
        main: <iframe id="youtube_iframe_player"
            width="640" height="360"
            src="https://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1"
            frameBorder="1"
        />
    }

    return (
        <div className='flex flex-col'>
            <Script
                id="youtube_iframe"
                src="https://www.youtube.com/iframe_api"
                strategy="beforeInteractive"
                onLoad={() => {
                    setIsYTIframeLoaded(true)
                    playerRef.current = new window.YT.Player('youtube_iframe_player', {
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
                }}
            />
            <Layout
                top={Content['top']}
                right={Content['right']}
                main={Content['main']}
                bottom={Content['bottom']}
                left={Content['left']}
            />
        </div>
    )
}