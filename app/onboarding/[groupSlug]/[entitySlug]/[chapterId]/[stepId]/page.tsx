import { CompanyStepPageParams } from '@/app/onboarding/types/pageProps'

import { Chapter } from '@/components/Chapter/Chapter'

export const dynamic = 'force-dynamic'

import { db } from '@/lib/db'

export default async function Page({
    params,
}: {
    params: CompanyStepPageParams
}) {
    const entityWithChapters = await prisma.entity.findUnique({
        where: {
            slug: params.entitySlug,
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

    //get the next entity group based on its level
    // for now we can just increment the id by 1

    const sortedChapters =
        entityWithChapters?.chapters?.sort((a, b) => a.order - b.order) ?? []

    console.log('slug', params.groupSlug)

    const currentEntityGroup = await db.entityGroup.findUnique({
        where: {
            slug: params.groupSlug,
        },
    })

    if (!currentEntityGroup) throw new Error('no entity group found')

    const nextEntityGroup = await db.entityGroup.findFirst({
        where: {
            level: {
                gt: currentEntityGroup.level,
            },
        },
        orderBy: {
            level: 'asc',
        },
    })

    const getCompletedLink = () => {
        if (!nextEntityGroup) {
            return `/onboarding/${params.groupSlug}/${params.entitySlug}/${params.chapterId}/${params.stepId}/completed`
        }

        return `/onboarding/${nextEntityGroup.slug}`
    }

    if (!entityWithChapters?.chapters) return <>no chapters found</>

    return (
        <Chapter
            chapterCompletedLink={getCompletedLink()}
            basePath={`/onboarding/${params.groupSlug}/${params.entitySlug}`}
            chapterId={params.chapterId}
            stepId={params.stepId}
            chapters={sortedChapters}
            entityTitle={entityWithChapters.name}
        />
    )
}
