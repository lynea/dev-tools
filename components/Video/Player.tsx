'use client'
import { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'videojs-youtube'
import 'video.js/dist/video-js.css'

const initialOptions = {
    controls: true,
    fluid: true,
    controlBar: {
        volumePanel: {
            inline: false,
        },
    },
}

const videoJsOptions = {
    sources: [
        {
            //important
        },
    ],
}

export const Player = ({ youtubeId }: { youtubeId: string }) => {
    const videoNode = useRef(null)
    const player = useRef(null)
    const initialized = useRef(false)

    const settings = {
        ...videoJsOptions,
        sources: [
            {
                src: `https://www.youtube.com/watch?v=${youtubeId}`,
                type: 'video/youtube',
            },
        ],
    }

    console.log('settings', settings)

    useEffect(() => {
        if (videoNode.current && !initialized.current) {
            initialized.current = true //prevent duplicate initialization
            //@ts-ignore
            player.current = videojs(videoNode.current, {
                ...initialOptions,
                ...settings,
            }).ready(function () {
                console.log('Player Ready')
            })
        }
        //clear up player on dismount
        return () => {
            if (player.current) {
                //@ts-ignore
                player.current.dispose()
            }
        }
    }, [])

    return (
        <div className="App">
            <video ref={videoNode} className="video-js" />
        </div>
    )
}
