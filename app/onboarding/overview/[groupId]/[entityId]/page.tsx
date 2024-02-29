import { auth } from '@clerk/nextjs'
import { Title } from '@/components/Title/Title'
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export default async function Page({
    params,
}: {
    params: CompletedPageParams
}) {
    const userInfo = auth()

    const { orgId } = userInfo

    if (!orgId) return <>no orgId was found</>

    const groupWithEntities = await db.entityGroup.findFirst({
        where: {
            organizationId: orgId,
        },
        include: {
            entities: true,
        },
    })

    if (!groupWithEntities) return <>no organisation was found</>

    const hasCompletedAll = true

    //i need the chapters and steps for the entity
    // i need the next group to go to

    const allGroups = await db.entityGroup.findMany({
        where: {
            organizationId: orgId,
        },
        include: {
            entities: true,
        },
    })

    const currentEntityInfo = await db.entity.findFirst({
        where: {
            id: params.entityId,
        },
        include: {
            chapters: {
                orderBy: {
                    order: 'asc',
                },
                include: {
                    steps: {
                        orderBy: {
                            order: 'asc',
                        },
                    },
                },
            },
        },
    })

    const indexOfCurrentGroup = allGroups.findIndex(
        (group) => group.id === params.groupId
    )

    const nextGroup = allGroups[indexOfCurrentGroup + 1]

    //should not allow to be here if user has not completed all steps

    // const client = getClient()

    // const { data: entityData }: { data: EntityInfoQuery } = await client.query({
    //     query: entityInfoQuery,
    //     variables: {
    //         id: params.entityId,
    //     },
    // })

    // const { data: childGroup }: { data: AllEntityGroupQuery } =
    //     await client.query({
    //         query: allEntityGroupQuery,
    //         variables: {
    //             id: params.entityId,
    //         },
    //     })
    // console.log(entityData.entity)

    if (!currentEntityInfo)
        return <h2 className="text-white">no entity found with that id</h2>

    //we should get all entity groups and all enties in them

    return (
        <div className="flex w-full flex-col">
            <Link href="/onboarding/overview">
                <Button pill gradientMonochrome="pink">
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-4" /> Back
                    to Overview
                </Button>
            </Link>

            {/* TODO implemmnt breadcrumb */}
            {/* <Breadcrumb aria-label="Default breadcrumb example">
                <BreadcrumbItem href="#">overview</BreadcrumbItem>
                <BreadcrumbItem href="#">sharing group</BreadcrumbItem>
                <BreadcrumbItem>entity</BreadcrumbItem>
            </Breadcrumb> */}
            <section className="mt-5 flex w-full flex-col ">
                <Title>{currentEntityInfo.name}</Title>

                <h2 className="mb-4 mt-4 text-4xl font-bold text-white">
                    chapters
                </h2>
                <Accordion collapseAll>
                    <>
                        {currentEntityInfo.chapters.map((chapter) => (
                            <AccordionPanel key={chapter?.id}>
                                <AccordionTitle>
                                    {chapter?.title}
                                </AccordionTitle>
                                <AccordionContent>
                                    <ul className="mb-10">
                                        {chapter?.steps.map((step) => (
                                            <li
                                                key={step?.id}
                                                className="mb-2 text-white dark:text-gray-400"
                                            >
                                                - {step?.title}
                                            </li>
                                        ))}
                                    </ul>
                                    <Link
                                        href={`/onboarding/${params.groupId}/${params.entityId}/${chapter?.id}`}
                                    >
                                        <Button>Go to chapter</Button>
                                    </Link>
                                </AccordionContent>
                            </AccordionPanel>
                        ))}
                    </>
                </Accordion>
            </section>
            <section className="mt-5 w-full ">
                <h2 className="mb-4 mt-4 text-4xl font-bold text-white">
                    {nextGroup?.name}
                </h2>
                {nextGroup?.entities?.map((entity, index) => (
                    <div
                        key={entity?.id}
                        className=" mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
                    >
                        <Card
                            key={entity?.name! + index}
                            href={`/onboarding/overview/${nextGroup.id}/${entity?.id}`}
                            className=" relative max-w-md text-main-200"
                        >
                            <h5 className="text-2xl font-bold tracking-tight text-main-200">
                                {entity?.name}
                            </h5>
                        </Card>
                    </div>
                ))}
            </section>
        </div>
    )
}
