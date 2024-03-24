import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { EntityTable } from '@/components/EntityTable/EntityTable'
import { Separator } from '@/components/ui/separator'
import { StepEdit } from './StepEdit'
import { StepTable } from '@/components/StepTable/StepTable'

export default async function Page({
    params: { id },
}: {
    params: { id: string }
}) {
    return (
        <>
            <Suspense
                fallback={
                    <Skeleton className="mt-6 h-80 w-[30rem] rounded-xl" />
                }
            >
                <StepEdit id={id} />
            </Suspense>
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <StepTable limit={5} />
            </Suspense>
        </>
    )
}
