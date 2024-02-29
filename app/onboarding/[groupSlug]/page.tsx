import { EntityGroupSelectPageParams } from '@/app/onboarding/types/pageProps'
import { EntitySelect } from '@/components/EntitySelect/EntitySelect'
import { Entities } from '@/components/EntitySelect/types'
import { Title } from '@/components/Title/Title'

import { db } from '@/lib/db'
import { Chapter, Entity, Step } from '@prisma/client'

export default async function Page({
    params,
}: {
    params: EntityGroupSelectPageParams
}) {
    let entityGroupInfo = await db.entityGroup.findUnique({
        where: {
            slug: params.groupSlug,
        },
        include: {
            entities: true,
        },
    })

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
                firstChapterId: `${entity.firstChapter?.id}`,
                firstStepId: `${entity.firstChapter?.steps[0].id}`,
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

    //TODO: see if we can make it so that it queries for a entity programmaticly
    // const chaptersForDepartment = data.entityGroup?.linkedFrom?.chapterCollection

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <Title size="xl"> The {formattedGroup?.name} </Title>
            <h2 className="mt-6 mb-8 text-4xl font-bold text-white">
                For which of our {formattedGroup?.name} will you work?
            </h2>
            <EntitySelect
                entities={formattedGroup?.entities ?? []}
                navigationPath={`/onboarding/${params.groupSlug}`}
            />
        </section>
    )
}
