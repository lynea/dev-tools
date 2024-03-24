import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { StepEditForm } from './StepEditForm'
import { stepUpdateSchema } from '@/lib/schema/entityGroup.schema'
import { z } from 'zod'

type StepEditProps = {
    id: string
}

export const StepEdit: FunctionComponent<StepEditProps> = async ({ id }) => {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')
    const chapters = await db.chapter.findMany({
        where: {
            organizationId: orgId,
        },
    })

    if (!chapters.length) return <>you must first create a chapter</>

    const currentData = await db.step.findFirst({
        where: {
            id,
        },
    })

    if (!currentData) return <>no Entity matching that id</>

    const currentStepInfo: z.infer<typeof stepUpdateSchema> = {
        chapterId: currentData.chapterId,
        description: currentData.description,
        id: currentData.id,
        title: currentData.title,
        order: currentData.order,
        slug: currentData.slug,
        videoUrl: currentData?.videoUrl ?? undefined,
    }

    return (
        <section className="mt-5 flex w-full flex-col ">
            <StepEditForm
                chapters={chapters}
                currentStepInfo={currentStepInfo}
            />
        </section>
    )
}
