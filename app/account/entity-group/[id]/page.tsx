import { Suspense } from 'react'
import { EntityGroupEdit } from './EntityGroupEdit'
import { Skeleton } from '@/components/ui/skeleton'
import { EntityGroupTable } from '@/components/EntityGroupTable/EntityGroupTable'
import { Separator } from '@/components/ui/separator'

export default async function Page({
    params: { id },
}: {
    params: { id: string }
}) {
    return (
        <>
            <Suspense
                fallback={<Skeleton className="h-full w-[30rem] rounded-xl" />}
            >
                <EntityGroupEdit id={id} />
            </Suspense>
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <EntityGroupTable limit={5} />
            </Suspense>
        </>
    )
}
