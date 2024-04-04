import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'
import { deleteStep } from '@/app/actions'

type StepTableProps = {
    limit: number
    query?: string
}

export const StepTable: FunctionComponent<StepTableProps> = async ({
    limit,
    query,
}) => {
    const { orgId } = auth()

    const getLastSteps = async () => {
        const steps = await db.step.findMany({
            where: {
                organizationId: orgId,
                title: {
                    contains: query ?? '',
                },
            },
            include: {
                chapter: true,
            },
            take: limit,
        })

        const withChapter = steps
            .map((step) => {
                return {
                    id: step.id,
                    slug: step.slug,
                    title: step.title,
                    chapter: step.chapter.title,
                }
            })
            .sort((a, b) =>
                a.chapter === b.chapter ? 0 : a.chapter < b.chapter ? -1 : 1
            )

        return withChapter
    }
    const lastSteps = await getLastSteps()

    return (
        <EntryTable
            deleteAction={deleteStep}
            entries={lastSteps}
            entryName="steps"
            editPath="/account/step/"
        />
    )
}
