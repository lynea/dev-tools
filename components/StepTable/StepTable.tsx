import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'

type StepTableProps = {
    limit: number
}

export const StepTable: FunctionComponent<StepTableProps> = async ({
    limit,
}) => {
    const { orgId } = auth()

    const getLastSteps = async () => {
        return await db.step.findMany({
            where: {
                organizationId: orgId,
            },
            take: limit,
        })
    }

    return (
        <EntryTable
            getEntities={getLastSteps}
            entryName="steps"
            editPath="/account/step/"
        />
    )
}
