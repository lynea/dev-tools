import { db } from '@/lib/db'
import { EntityForm } from './EntityForm'
import { auth } from '@clerk/nextjs'

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const entityGroups = await db.entityGroup.findMany({
        where: {
            organizationId: orgId,
        },
    })

    return <EntityForm entityGroups={entityGroups} />
}
