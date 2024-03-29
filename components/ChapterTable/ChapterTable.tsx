import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'

type ChapterTableProps = {
    limit: number
    query?: string
}

export const ChapterTable: FunctionComponent<ChapterTableProps> = async ({
    limit,
    query,
}) => {
    const { orgId } = auth()

    const getLastChapters = async () => {
        const chapters = await db.chapter.findMany({
            where: {
                organizationId: orgId,
                title: {
                    contains: query ?? '',
                },
            },
            include: {
                entity: true,
            },
            orderBy: {
                createdAt: 'desc',
            },

            take: limit,
        })

        const withEntity = chapters
            .map((chapter) => {
                return {
                    id: chapter.id,
                    slug: chapter.slug,
                    title: chapter.title,
                    entity: chapter?.entity?.name,
                }
            })
            .sort((a, b) => (a.entity === b.entity ? 0 : 1))

        return withEntity
    }

    const chapters = await getLastChapters()

    return (
        <EntryTable
            entries={chapters}
            entryName="chapters"
            editPath="/account/chapter/"
        />
    )
}
