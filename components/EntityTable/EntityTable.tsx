import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'

type EntityTableProps = {
    limit: number
}

export const EntityTable: FunctionComponent<EntityTableProps> = async ({
    limit,
}) => {
    const { orgId } = auth()

    const getLastEntities = async () => {
        return await db.entity.findMany({
            where: {
                organizationId: orgId,
            },
            take: limit,
        })
    }

    return (
        <EntryTable
            getEntities={getLastEntities}
            entryName="entities"
            editPath="/account/entity/"
        />
    )
}
