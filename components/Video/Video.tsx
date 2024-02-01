'use client'

import React, { useEffect, useRef } from 'react'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
//@ts-ignore
export const VideoPlayer = (props) => {
    const videoRef = useRef(null)
    const playerRef = useRef(null)

    useEffect(() => {
        // Ensure Video.js player is only initialized once
        if (!playerRef.current) {
            //@ts-ignore
            playerRef.current = videojs(videoRef.current, props, () => {
                console.log('player is ready')
            })
        }
    }, [props])

    // Dispose the player on component unmount
    useEffect(() => {
        return () => {
            if (playerRef.current) {
                //@ts-ignore
                playerRef.current.dispose()
                playerRef.current = null
            }
        }
    }, [])

    return (
        <div data-vjs-player>
            <video ref={videoRef} className="video-js vjs-default-skin" />
        </div>
    )
}

export default VideoPlayer
