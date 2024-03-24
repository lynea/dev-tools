import { Dashboard } from '@/components/dashboard'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'

export default async function Page() {
    const { orgRole, orgId } = auth()

    //we need the amount of started deverlopers
    // we need the amount of finished developers

    if (orgRole !== 'org:admin')
        throw new Error('You must be an admin to access this page')

    //TODO add role to users so we can filter admins
    const allUsers = await db.user.findMany({
        where: {
            userOrganizations: {
                some: {
                    organizationId: orgId,
                },
            },
        },
    })

    return <Dashboard users={allUsers} />
}
