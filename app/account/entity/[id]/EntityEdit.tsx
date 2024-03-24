import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntityUpdateForm } from './EntityUpdateForm'

type EntityEditProps = {
    id: string
}

export const EntityEdit: FunctionComponent<EntityEditProps> = async ({
    id,
}) => {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const entityGroups = await db.entityGroup.findMany({
        where: {
            organizationId: orgId,
        },
    })

    const currentData = await db.entity.findFirst({
        where: {
            id,
        },
    })

    if (!currentData) return <>no Entity matching that id</>

    return (
        <section className="mt-5 flex w-full flex-col ">
            <EntityUpdateForm entityData={currentData} groups={entityGroups} />
        </section>
    )
}
