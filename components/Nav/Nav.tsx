'use client'

import { UserButton } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import logo from '../../public/logo.svg'
import Image from 'next/image'
import Link from 'next/link'

export const Nav: FunctionComponent = () => {
    return (
        <nav className="absolute top-0 flex w-full px-6 py-4 text-white">
            <Link href="/">
                <Image
                    src={logo}
                    alt="logo"
                    className="mr-6 h-9 w-40 fill-white "
                />
            </Link>
            <UserButton />
            {/* <div className="ml-4">logo</div> */}
        </nav>
    )
}
