import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'
import { deleteEntityGroup } from '@/app/actions'

type EntityGroupTableProps = {
    limit: number
    query?: string
}

export const EntityGroupTable: FunctionComponent<
    EntityGroupTableProps
> = async ({ limit, query }) => {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const getLastEntityGroups = async () => {
        return await db.entityGroup.findMany({
            where: {
                organizationId: orgId,
                name: {
                    contains: query ?? '',
                },
            },
            orderBy: {
                level: 'asc',
            },
            take: limit,
        })
    }

    const lastEntityGroups = await getLastEntityGroups()

    return (
        <EntryTable
            deleteAction={deleteEntityGroup}
            entries={lastEntityGroups}
            entryName="entity groups"
            editPath="/account/entity-group/"
        />
    )
}
