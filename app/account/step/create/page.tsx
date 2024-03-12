import { db } from '@/lib/db'
import { StepForm } from './StepForm'
import { auth } from '@clerk/nextjs'

export default async function Page() {
    const { orgId, userId } = auth()

    if (!orgId) throw new Error('No organization found')

    const chapters = await db.chapter.findMany({
        where: {
            organizationId: orgId,
        },
    })

    if (!chapters.length) return <>you must first create a chapter</>

    return <StepForm chapters={chapters} />
}
