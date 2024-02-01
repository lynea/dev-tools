import { currentUser } from '@clerk/nextjs/app-beta'
import type { User } from '@clerk/nextjs/api'

import { Title } from '@/components/Title/Title'

import { getClient } from '@/lib/client'

import { db } from '@/lib/db'
import { CompletedPageParams } from '@/app/onboarding/types/pageProps'
import {
    Accordion,
    AccordionContent,
    AccordionPanel,
    AccordionTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Card,
} from 'flowbite-react'
import { AllEntityGroupQuery, EntityInfoQuery } from '@/generated/graphql'
import {
    allEntityGroupQuery,
    entityInfoQuery,
} from '@/graphql/queries/entityGroups'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    faArrowLeft,
    faSquareArrowUpRight,
} from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

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

    const { data: entityData }: { data: EntityInfoQuery } = await client.query({
        query: entityInfoQuery,
        variables: {
            id: params.entityId,
        },
    })

    const { data: childGroup }: { data: AllEntityGroupQuery } =
        await client.query({
            query: allEntityGroupQuery,
            variables: {
                id: params.entityId,
            },
        })
    console.log(entityData.entity)
    if (!entityData.entity)
        return <h2 className="text-white">no entity found with that id</h2>

    //we should get all entity groups and all enties in them

    return (
        <div className="flex w-full flex-col">
            {entityData.entity.parent?.level === 1 ? null : (
                <Link href="/onboarding/overview">
                    <Button pill gradientMonochrome="pink">
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-4" />{' '}
                        Back to Overview
                    </Button>
                </Link>
            )}

            {/* TODO implemmnt breadcrumb */}
            {/* <Breadcrumb aria-label="Default breadcrumb example">
                <BreadcrumbItem href="#">overview</BreadcrumbItem>
                <BreadcrumbItem href="#">sharing group</BreadcrumbItem>
                <BreadcrumbItem>entity</BreadcrumbItem>
            </Breadcrumb> */}
            <section className="mt-5 flex w-full flex-col ">
                <Title>{entityData.entity?.name}</Title>

                <h2 className="mb-4 mt-4 text-4xl font-bold text-white">
                    chapters
                </h2>
                <Accordion collapseAll>
                    <>
                        {entityData.entity?.linkedFrom?.chapterCollection?.items.map(
                            (chapter) => (
                                <AccordionPanel key={chapter?.sys.id}>
                                    <AccordionTitle>
                                        {chapter?.name}
                                    </AccordionTitle>
                                    <AccordionContent>
                                        <ul className="mb-10">
                                            {chapter?.linkedFrom?.onboardStepCollection?.items.map(
                                                (step) => (
                                                    <li
                                                        key={step?.sys.id}
                                                        className="mb-2 text-white dark:text-gray-400"
                                                    >
                                                        - {step?.title}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <Link
                                            href={`/onboarding/${params.groupId}/${params.entityId}/${chapter?.sys.id}`}
                                        >
                                            <Button>Go to chapter</Button>
                                        </Link>
                                    </AccordionContent>
                                </AccordionPanel>
                            )
                        )}
                    </>
                </Accordion>
            </section>
            <section className="mt-5 w-full ">
                {childGroup.entityGroupCollection?.items.map((group, index) => (
                    <div key={group?.sys.id}>
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
                    </div>
                ))}
            </section>
        </div>
    )
}
