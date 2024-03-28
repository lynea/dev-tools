import { EntityGroupOverview } from '@/components/EntityGroupOverview/EntityGroupOverview'
import { Card, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Suspense } from 'react'

export default async function Page() {
    const { orgId, userId } = auth()

    if (!orgId) return <>no orgId was found</>

    const allDataForOrg = await db.entityGroup.findMany({
        where: {
            organizationId: orgId,
        },
        include: {
            entities: true,
        },
    })

    return (
        <>
            <section className="mt-5 flex w-full flex-col text-foreground ">
                <div className="flex flex-nowrap gap-6">
                    {allDataForOrg
                        .sort((a, b) => a.level - b.level)
                        .map((group) => (
                            <Suspense
                                key={group.id}
                                fallback={
                                    <Skeleton className="h-full w-[30rem] rounded-xl" />
                                }
                            >
                                <EntityGroupOverview
                                    key={group.id}
                                    groupId={group.id}
                                />
                            </Suspense>
                        ))}
                </div>
            </section>
        </>
    )
}
