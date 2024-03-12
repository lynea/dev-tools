import { EntityGroupSelectPageParams } from '@/app/onboarding/types/pageProps'
import { EntitySelect } from '@/components/EntitySelect/EntitySelect'
import { Entities } from '@/components/EntitySelect/types'
import { Title } from '@/components/Title/Title'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'

import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { Chapter, Entity, Step } from '@prisma/client'
import Link from 'next/link'

export default async function Page({
    params,
}: {
    params: EntityGroupSelectPageParams
}) {
    const { orgRole, orgId } = auth()

    if (!orgId) throw new Error('no orgId found')

    let entityGroupInfo = await db.entityGroup.findUnique({
        where: {
            slug: params.groupSlug,
            organizationId: orgId,
        },
        include: {
            entities: true,
        },
    })

    if (!entityGroupInfo) throw new Error('No entity group found')

    if (!entityGroupInfo?.entities.length)
        return (
            <section className="flex w-full flex-col items-center justify-center ">
                <p className="mb-5 text-white">
                    There are no entities under this group yet please{' '}
                    {orgRole === 'org:admin'
                        ? 'create one'
                        : 'ask an admin to create one'}
                </p>
                {}
                <Link href="/account/entity/create">
                    <Button>Create a new entity</Button>
                </Link>
            </section>
        )

    // for each entity get the first chapter and the first step

    type EntityWithFirstChapter = Entity & {
        firstChapter: (Chapter & { steps: Step[] }) | undefined | null
    }

    let entitiesWithFirstChapterAndStep: EntityWithFirstChapter[] = []

    for (const entity of entityGroupInfo?.entities!) {
        const firstChapter = await db.chapter.findFirst({
            orderBy: {
                order: 'asc',
            },
            where: {
                entityId: entity.id,
            },
            include: {
                steps: {
                    take: 1, // only get the first step
                    orderBy: {
                        order: 'asc',
                    },
                },
            },
        })

        let entityWithChapter = entity as EntityWithFirstChapter

        entityWithChapter.firstChapter = firstChapter
        entitiesWithFirstChapterAndStep.push(entityWithChapter)
    }

    const entityGroupDataFactory = (
        entities: EntityWithFirstChapter[]
    ): { name: string; entities: Entities } | undefined => {
        const formattedEntities: Entities = entities.map((entity) => {
            //get the first chapter of the entity

            console.log('entity: ', entity)

            return {
                firstChapterId: entity.firstChapter?.id ?? '',
                firstStepId: entity.firstChapter?.steps[0]?.id ?? '',
                id: entity.slug ?? '',
                name: entity.name ?? '',
                slug: entity.slug ?? '',
            }
        })

        return {
            name: entityGroupInfo?.name!,
            entities: formattedEntities,
        }
    }

    const formattedGroup = entityGroupDataFactory(
        entitiesWithFirstChapterAndStep
    )

    const entitiesMissingFirstChapter =
        formattedGroup?.entities.filter((entity) => !entity.firstChapterId) ??
        []

    const entitiesMissingFirstStep =
        formattedGroup?.entities.filter((entity) => !entity.firstStepId) ?? []

    //TODO: see if we can make it so that it queries for a entity programmaticly
    // const chaptersForDepartment = data.entityGroup?.linkedFrom?.chapterCollection

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <Title size="xl"> The {formattedGroup?.name} </Title>
            <h2 className="mt-6 mb-8 text-4xl font-bold text-foreground">
                For which of our {formattedGroup?.name} will you work?
            </h2>

            <EntitySelect
                entities={formattedGroup?.entities ?? []}
                navigationPath={`/onboarding/${params.groupSlug}`}
            />
            {entitiesMissingFirstChapter.length > 0 ||
            entitiesMissingFirstStep.length > 0 ? (
                <Alert variant="destructive" className="w-fit">
                    <AlertDescription>
                        Not all entities have a chapter and a step!
                        {orgRole === 'org:admin' ? (
                            <Link href="/account">
                                <Button className="ml-6" variant={'secondary'}>
                                    {' '}
                                    add one
                                </Button>
                            </Link>
                        ) : null}
                    </AlertDescription>
                </Alert>
            ) : null}
        </section>
    )
}
