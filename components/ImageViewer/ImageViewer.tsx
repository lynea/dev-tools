'use client'

import Image from 'next/image'
import { FunctionComponent, useEffect, useRef, useState } from 'react'

type ImageViewerProps = {
    url: string
}

//TODO: add zoom in and out animation

export const ImageViewer: FunctionComponent<ImageViewerProps> = ({ url }) => {
    const [isZoomed, setIsZoomed] = useState<boolean>(false)
    const ref = useRef(null)

    const handleClickOutside = (event: any) => {
        // @ts-ignore
        if (ref.current && !ref.current.contains(event.target)) {
            setIsZoomed(false)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <>
            <div
                className={`absolute top-0 right-0 z-20    cursor-pointer backdrop-blur-lg backdrop-filter ${
                    isZoomed ? 'h-screen w-screen' : 'h-0 w-0'
                } `}
            >
                <div
                    ref={ref}
                    className={`absolute top-1/2 left-1/2 z-50   aspect-[4/3] -translate-x-1/2 -translate-y-1/2 transform cursor-zoom-out  object-cover transition-all duration-500 ease-in-out ${
                        isZoomed ? 'w-1/2' : 'h-0 w-0'
                    }`}
                >
                    <Image
                        onClick={() => setIsZoomed(!isZoomed)}
                        src={url}
                        fill={true}
                        objectFit={isZoomed ? 'contain' : 'cover'}
                        objectPosition="top"
                        alt="sdsd"
                        placeholder="blur"
                        blurDataURL='data:image/svg+xml;base64,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#000000"></rect></svg>'
                    />
                </div>
            </div>

            <div
                className={
                    'relative h-80 w-full cursor-zoom-in overflow-hidden rounded-lg '
                }
            >
                <Image
                    onClick={() => setIsZoomed(true)}
                    src={url}
                    fill={true}
                    objectFit={'cover'}
                    objectPosition="top"
                    alt="sdsd"
                    placeholder="blur"
                    blurDataURL='data:image/svg+xml;base64,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" fill="#000000"></rect></svg>'
                />
            </div>
        </>
    )
}
