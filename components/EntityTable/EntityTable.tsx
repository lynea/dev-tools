import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'
import { deleteEntity } from '@/app/actions'

type EntityTableProps = {
    limit: number
    query?: string
    group?: string
}

export const EntityTable: FunctionComponent<EntityTableProps> = async ({
    limit,
    query,
    group,
}) => {
    const { orgId } = auth()

    const getLastEntities = async () => {
        const entities = await db.entity.findMany({
            where: {
                organizationId: orgId,
                name: {
                    contains: query ?? '',
                },
                entityGroup: {
                    slug: group ?? undefined,
                },
            },
            include: {
                entityGroup: true,
            },
            take: limit,
        })

        const withGroupName = entities.map((entity) => {
            return {
                id: entity.id,
                slug: entity.slug,
                name: entity.name,
                group: entity.entityGroup.name,
            }
        })

        return withGroupName
    }

    const entities = await getLastEntities()

    return (
        <>
            <EntryTable
                deleteAction={deleteEntity}
                entries={entities}
                entryName="entities"
                editPath="/account/entity/"
            />
        </>
    )
}
