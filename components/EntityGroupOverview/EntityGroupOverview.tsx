import { FunctionComponent } from 'react'

import { Card, CardHeader } from '../ui/card'
import { db } from '@/lib/db'
import { Button } from '../ui/button'
import Link from 'next/link'
import { group } from 'console'

type EntityGroupOverviewProps = {
    groupId: string
}

export const EntityGroupOverview: FunctionComponent<
    EntityGroupOverviewProps
> = async ({ groupId }) => {
    const groupInfo = await db.entityGroup.findFirst({
        where: {
            id: groupId,
        },
        orderBy: {
            level: 'asc',
        },
        include: {
            entities: {
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
            },
        },
    })

    if (!groupInfo) return <>no group was found</>

    return (
        <div>
            <div className="flex flex-col items-center rounded-lg border-2 border-dashed p-3 ">
                <h2 className="mb-5 text-xl font-bold text-foreground">
                    {groupInfo.name}
                </h2>

                {groupInfo.entities.map((entity) => (
                    <Card className="mb-6 w-[30rem] px-4 pb-4 ">
                        <CardHeader className="pl-0 font-bold">
                            {entity.name}
                        </CardHeader>

                        {entity.chapters.map((chapter) => (
                            <Card className="mb-3 p-3">
                                <CardHeader className="py-3 pl-0 font-bold">
                                    {chapter.title}
                                </CardHeader>
                                {chapter.steps.map((step) => (
                                    <Card className="mb-3 p-3">
                                        {step.title}
                                    </Card>
                                ))}
                            </Card>
                        ))}
                    </Card>
                ))}
                <Link href={'/account/entity-group/create'}>
                    <Button>Add more </Button>
                </Link>
            </div>
        </div>
    )
}
