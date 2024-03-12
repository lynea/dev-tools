import { db } from '@/lib/db'
import { TodoForm } from './TodoForm'
import { auth } from '@clerk/nextjs'

export default async function Page() {
    const { orgId, userId } = auth()

    if (!orgId) throw new Error('No organization found')

    const allSteps = await db.step.findMany({
        where: {
            organizationId: orgId,
        },
        orderBy: {
            order: 'asc',
        },
    })

    if (!allSteps.length) return <>you must first create a step</>

    return <TodoForm steps={allSteps} />
}
