import { db } from '@/lib/db'
import { StepForm } from './StepForm'
import { auth } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'

import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'
import { StepTable } from '@/components/StepTable/StepTable'

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const chapters = await db.chapter.findMany({
        where: {
            organizationId: orgId,
        },
    })

    if (!chapters.length) return <>you must first create a chapter</>

    return (
        <div>
            <StepForm chapters={chapters} />
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <StepTable limit={5} />
            </Suspense>
        </div>
    )
}
