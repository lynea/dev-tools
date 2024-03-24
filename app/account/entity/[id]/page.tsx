import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { EntityEdit } from './EntityEdit'

import { EntityTable } from '@/components/EntityTable/EntityTable'
import { Separator } from '@/components/ui/separator'

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
                <EntityEdit id={id} />
            </Suspense>
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <EntityTable limit={5} />
            </Suspense>
        </>
    )
}
