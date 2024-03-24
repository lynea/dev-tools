import { db } from '@/lib/db'
import { EntityForm } from './EntityForm'
import { auth } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'

import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { EntityTable } from '@/components/EntityTable/EntityTable'

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const entityGroups = await db.entityGroup.findMany({
        where: {
            organizationId: orgId,
        },
    })

    return (
        <div>
            <EntityForm entityGroups={entityGroups} />
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <EntityTable limit={5} />
            </Suspense>
        </div>
    )
}
