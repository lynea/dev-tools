import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { ChapterEdit } from './ChapterEdit'

import { Separator } from '@/components/ui/separator'
import { ChapterTable } from '@/components/ChapterTable/ChapterTable'

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
                <ChapterEdit id={id} />
            </Suspense>
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <ChapterTable limit={5} />
            </Suspense>
        </>
    )
}
