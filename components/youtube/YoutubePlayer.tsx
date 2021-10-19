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
        playerRef.current?.playVideo()
    }

    function stop() {
        if (!playerRef.current) return
        playerRef.current?.stopVideo()
    }

    async function loadVideos() {
        let videoQue = props.videoList.map((ele: any) => {
            return ele.items.map((item: any) => item.snippet.resourceId.videoId)
        })
        setVideoQueSize(videoQue.length)
        setVideoQue(videoQue)
    }

    async function loadQue() {
        if (!playerRef.current) return
        playerRef.current?.cuePlaylist(videoQue[videoQueIndex])
        playerRef.current?.setLoop(true)
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
            ? playerRef.current?.nextVideo()
            : playerRef.current?.previousVideo()
    }

    useEffect(() => {
        setIsYTIframeLoaded(true)
        window.YT.ready(function () {
            playerRef.current = new window.YT.Player('youtube_iframe_player', {
                height: '390',
                width: '640',
                videoId: 'M7lc1UVf-VE',
                playerRefVars: {
                    'playsinline': 1
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': () => { },
                }
            });
        })
        function onPlayerReady(event: any) {
            event.target.playVideo();
            event.target.setLoop(true);
        }

    }, [])

    useEffect(() => {
        console.log('what is videolist', props.videoList)
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