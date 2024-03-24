import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { ChapterUpdateForm } from './ChapterUpdateForm'

type ChapterEditProps = {
    id: string
}

export const ChapterEdit: FunctionComponent<ChapterEditProps> = async ({
    id,
}) => {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const entities = await db.entity.findMany({
        where: {
            organizationId: orgId,
        },
    })

    const currentData = await db.chapter.findFirst({
        where: {
            id,
        },
    })

    if (!entities.length) return <>you must first create an entity</>

    return (
        <section className="mt-5 flex w-full flex-col ">
            <ChapterUpdateForm
                chapterData={{
                    entityId: currentData?.entityId ?? '',
                    id: currentData?.id ?? '',
                    slug: currentData?.slug ?? '',
                    title: currentData?.title ?? '',
                }}
                entityGroups={entities}
            />
        </section>
    )
}
