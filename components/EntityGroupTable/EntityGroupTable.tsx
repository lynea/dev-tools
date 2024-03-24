import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'

type EntityGroupTableProps = {
    limit: number
}

export const EntityGroupTable: FunctionComponent<
    EntityGroupTableProps
> = async ({ limit }) => {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const getLastEntityGroups = async () => {
        return await db.entityGroup.findMany({
            where: {
                organizationId: orgId,
            },
            orderBy: {
                level: 'asc',
            },
            take: limit,
        })
    }

    return (
        <EntryTable
            getEntities={getLastEntityGroups}
            entryName="entity groups"
            editPath="/account/entity-group/"
        />
    )
}
