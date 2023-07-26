'use client'

import Image from 'next/image'
import { FunctionComponent, useState } from 'react'

type ImageViewerProps = {
    url: string
}

//TODO: add zoom in and out animation

export const ImageViewer: FunctionComponent<ImageViewerProps> = ({ url }) => {
    const [isZoomed, setIsZoomed] = useState<boolean>(false)

    if (isZoomed) {
        return (
            <div
                className="fixed top-0 left-0 flex h-screen w-screen  items-center justify-center bg-black bg-opacity-50"
                onClick={() => setIsZoomed(false)}
            >
                <div className=" relative h-1/2 w-1/2 cursor-zoom-out overflow-hidden rounded-lg">
                    <Image
                        src={url}
                        fill={true}
                        objectFit="contain"
                        objectPosition="top"
                        alt="Picture of the author"
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="relative h-80 w-full cursor-zoom-in overflow-hidden rounded-lg">
            <Image
                onClick={() => setIsZoomed(true)}
                src={url}
                fill={true}
                objectFit="cover"
                objectPosition="top"
                alt="Picture of the author"
            />
        </div>
    )
}
