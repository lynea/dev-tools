import { auth } from '@clerk/nextjs'
import { Title } from '@/components/Title/Title'
import { db } from '@/lib/db'
import { CompletedPageParams } from '@/app/onboarding/types/pageProps'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Card } from 'flowbite-react'

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

    if (!currentEntityInfo)
        return <h2 className="text-white">no entity found with that id</h2>

    //we should get all entity groups and all enties in them

    return (
        <div className="flex w-full flex-col">
            <Link href="/onboarding/overview">
                <Button>
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-4" /> Back
                    to Overview
                </Button>
            </Link>

            <section className="mt-5 flex w-full flex-col ">
                <Title>{currentEntityInfo.name}</Title>

                <h2 className="mb-4 mt-4 text-4xl font-bold text-foreground">
                    chapters
                </h2>

                <Table>
                    <TableCaption>
                        {' '}
                        All chapters for {currentEntityInfo.name}
                    </TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Name</TableHead>
                            <TableHead>Steps</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentEntityInfo.chapters.map((chapter) => (
                            <TableRow key={chapter.id}>
                                <TableCell className="font-medium">
                                    {chapter.title}
                                </TableCell>
                                <TableCell>
                                    {' '}
                                    <ul>
                                        {chapter.steps.map((step) => (
                                            <li key={step.id}>
                                                {' '}
                                                <Link href={'/step'}>
                                                    {step.title}
                                                </Link>{' '}
                                            </li>
                                        ))}
                                    </ul>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
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
                        <Link
                            href={`/onboarding/overview/${nextGroup.id}/${entity?.id}`}
                        >
                            <Card
                                key={entity?.name! + index}
                                className=" relative max-w-md text-main-200"
                            >
                                <h5 className="text-2xl font-bold tracking-tight text-main-200">
                                    {entity?.name}
                                </h5>
                            </Card>
                        </Link>
                    </div>
                ))}
            </section>
        </div>
    )
}
