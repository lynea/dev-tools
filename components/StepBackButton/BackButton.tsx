'use client'

import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'

export const BackButton = () => {
    const router = useRouter()

    return <Button onClick={router.back}>Previous</Button>
}
