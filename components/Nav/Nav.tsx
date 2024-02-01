'use client'

import { UserButton } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import Link from 'next/link'

export const Nav: FunctionComponent = () => {
    return (
        <nav className="absolute top-0 flex w-full px-6 py-4 text-white">
            <Link href="/onboarding">
                {/* <Image
                    src={logo}
                    alt="logo"
                    className="mr-6 h-9 w-40 fill-white "
                /> */}
                <h2 className="mr-6 h-9  text-2xl font-bold text-white">
                    The sharing group
                </h2>
            </Link>
            <UserButton afterSignOutUrl="/" />
            {/* <div className="ml-4">logo</div> */}
        </nav>
    )
}
