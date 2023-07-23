'use client'

import { FunctionComponent } from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown } from '@fortawesome/free-solid-svg-icons'
import { FireWorks } from '../FireWorks/FireWorks'

type BadgeProps = {
    imageUrl: string
    text: string
    best?: boolean
    label: string
}

export const Badge: FunctionComponent<BadgeProps> = ({
    imageUrl,
    text,
    best,
    label,
}) => {
    return (
        <div
            className={`flex  text-${
                best ? 'gold' : 'white'
            } group relative flex-col items-center `}
        >
            {best && (
                <>
                    <div className="absolute top-0 h-60 w-60">
                        <FireWorks></FireWorks>
                    </div>
                    <FontAwesomeIcon
                        icon={faCrown}
                        className=" text-l mb-2 h-10 text-gold"
                    />
                </>
            )}
            <div className="relative flex w-fit justify-center">
                <Image
                    className="rounded-full"
                    alt="winner"
                    src={imageUrl}
                    width={100}
                    height={100}
                />
                <span className=" absolute top-7 block scale-0 whitespace-nowrap rounded bg-white p-2 text-lg font-bold text-purple-200 transition-all group-hover:scale-100">
                    ✨ {label}
                </span>
            </div>

            <p className="mt-3 text-2xl font-bold">{text}</p>
        </div>
    )
}
