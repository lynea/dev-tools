import { Suspense } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

import { Separator } from '@/components/ui/separator'

import { TodoEdit } from './TodoEdit'
import { TodoTable } from '@/components/TodoTable/TodoTable'

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
                <TodoEdit id={id} />
            </Suspense>
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <TodoTable limit={100} />
            </Suspense>
        </>
    )
}
