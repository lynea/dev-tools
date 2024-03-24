import { db } from '@/lib/db'
import { EntityGroupForm } from './EntityGroupForm'
import { auth } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'

import { EntityGroupTable } from '@/components/EntityGroupTable/EntityGroupTable'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    return (
        <div>
            <EntityGroupForm />
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <EntityGroupTable limit={5} />
            </Suspense>
        </div>
    )
}
