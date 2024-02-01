'use client'

import { createOrUpdateUser } from '@/app/actions'
import { User } from '@/lib/schema/user.schema'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ReactNode, startTransition } from 'react'

export const CompleteButton = ({
    user,
    children,
}: {
    user: User
    children: ReactNode
}) => {
    const router = useRouter()

    const handeClick = async (e: any) => {
        e.preventDefault()

        try {
            startTransition(() =>
                //@ts-ignore
                createOrUpdateUser({ id: user.id, team: user.team }, true)
            )
        } catch (error) {
            console.error(error)
        } finally {
            router.push(`/onboarding/${user.team}/overview`)
        }
    }

    return (
        <button
            className="mt-28 flex animate-bounce justify-center rounded-md bg-pink-600 px-6 py-3 text-xl font-bold text-white "
            onClick={handeClick}
        >
            {children}
        </button>
    )
}
