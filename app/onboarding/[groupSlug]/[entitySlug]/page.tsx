import { db } from '@/lib/db'
import { CompletedPageParams } from '../../types/pageProps'
import { redirect } from 'next/navigation'

export default async function Page({
    params,
}: {
    params: CompletedPageParams
}) {
    //find the first chapter of the entity and the first step

    const entityWithFirstChapter = await db.entity.findFirst({
        where: {
            slug: params.entitySlug,
        },
        include: {
            chapters: {
                take: 1, // only get the first chapter
                orderBy: {
                    order: 'asc',
                },
                include: {
                    steps: {
                        take: 1, // only get the first step
                        orderBy: {
                            order: 'asc',
                        },
                    },
                },
            },
        },
    })

    const firstChapter = entityWithFirstChapter?.chapters[0]

    const firstStep = firstChapter?.steps[0]

    if (!firstChapter || !firstStep) return <>no first chapter or step found</>

    redirect(
        `/onboarding/${params.groupSlug}/${params.entitySlug}/${firstChapter?.id}/${firstStep?.id}`
    )
}
