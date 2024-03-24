import { db } from '@/lib/db'
import { ChapterForm } from './ChapterForm'
import { auth } from '@clerk/nextjs'

import { Separator } from '@/components/ui/separator'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { ChapterTable } from '@/components/ChapterTable/ChapterTable'

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const entities = await db.entity.findMany({
        where: {
            organizationId: orgId,
        },
    })

    if (!entities.length) return <>you must first create an entity</>

    return (
        <div>
            <ChapterForm entityGroups={entities} />{' '}
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <ChapterTable limit={5} />
            </Suspense>
        </div>
    )
}
