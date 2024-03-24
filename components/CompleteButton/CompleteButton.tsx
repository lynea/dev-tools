'use client'

import { setUserCompleted } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

export const CompleteButton = ({ children }: { children: ReactNode }) => {
    const router = useRouter()

    const handeClick = async (e: any) => {
        e.preventDefault()
        const user = await setUserCompleted()

        if (!user) return

        router.push(`/onboarding/overview`)
    }

    return (
        <button
            className="mt-28 flex animate-bounce justify-center rounded-md bg-pink px-6 py-3 text-xl font-bold text-foreground "
            onClick={handeClick}
        >
            {children}
        </button>
    )
}
