import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'

type ChapterTableProps = {
    limit: number
}

export const ChapterTable: FunctionComponent<ChapterTableProps> = async ({
    limit,
}) => {
    const { orgId } = auth()

    const getLastChapters = async () => {
        return await db.chapter.findMany({
            where: {
                organizationId: orgId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: limit,
        })
    }

    return (
        <EntryTable
            getEntities={getLastChapters}
            entryName="chapters"
            editPath="/account/chapter/"
        />
    )
}
