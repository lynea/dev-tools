import { currentUser } from '@clerk/nextjs/app-beta'
import type { User } from '@clerk/nextjs/api'

import { Title } from '@/components/Title/Title'

import { getClient } from '@/lib/client'

import { db } from '@/lib/db'
import { CompletedPageParams } from '@/app/onboarding/types/pageProps'
import { Breadcrumb, BreadcrumbItem, Card } from 'flowbite-react'
import { FunctionComponent } from 'react'
import {
    AllEntityGroupWithEntityQuery,
    FirstGroupWithEntityQuery,
} from '@/generated/graphql'
import {
    allEntityGroupWithEntityQuery,
    firstGroupWithEntity,
} from '@/graphql/queries/entityGroups'
import { Button } from '@/components/Button/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons'
import { redirect } from 'next/navigation'

export default async function Page({
    params,
}: {
    params: CompletedPageParams
}) {
    const user: User | null = await currentUser()

    if (!user?.id) return <>no user was found</>

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    })

    const hasCompletedAll = dbUser?.hasCompleted

    //should not allow to be here if user has not completed all steps

    const client = getClient()

    const { data: firstGroupData }: { data: FirstGroupWithEntityQuery } =
        await client.query({
            query: firstGroupWithEntity,
        })

    // if there is only one group, with only one entity, redirect to that entity

    if (
        firstGroupData.entityGroupCollection?.items.length === 1 &&
        firstGroupData.entityGroupCollection?.items[0]?.linkedFrom
            ?.entityCollection?.items.length === 1
    ) {
        redirect(
            `/onboarding/overview/${firstGroupData.entityGroupCollection.items.at(
                0
            )?.sys
                .id}/${firstGroupData.entityGroupCollection?.items[0]?.linkedFrom?.entityCollection?.items.at(
                0
            )?.sys.id}`
        )
    }

    return (
        <>
            <section className="mt-5 flex w-full flex-col ">
                <Title>Looking for a recap?</Title>

                {firstGroupData.entityGroupCollection?.items.map((group) => (
                    <>
                        <h2 className="mb-4 mt-4 text-4xl font-bold text-white">
                            {group?.name}
                        </h2>
                        <div className=" mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            {group?.linkedFrom?.entityCollection?.items.map(
                                (entity, index) => (
                                    <Card
                                        key={entity?.name! + index}
                                        href={`/onboarding/overview/${group.sys.id}/${entity?.sys.id}`}
                                        className=" relative max-w-md text-main-200"
                                    >
                                        {/* <FontAwesomeIcon
                                            icon={faSquareArrowUpRight}
                                            className=" text-l absolute top-1 right-1 mb-2 h-7 text-pink-400"
                                        /> */}
                                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {entity?.name}
                                        </h5>
                                    </Card>
                                )
                            )}
                        </div>
                    </>
                ))}
            </section>
        </>
    )
}
