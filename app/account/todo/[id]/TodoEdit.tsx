import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { TodoEditForm } from './TodoEditForm'
import { z } from 'zod'
import { todoSchema, todoUpdateSchema } from '@/lib/schema/entityGroup.schema'

type TodoEditProps = {
    id: string
}

export const TodoEdit: FunctionComponent<TodoEditProps> = async ({ id }) => {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const allSteps = await db.step.findMany({
        where: {
            organizationId: orgId,
        },
        orderBy: {
            order: 'asc',
        },
    })

    const currentData = await db.todo.findFirst({
        where: {
            id,
        },
    })
    if (!allSteps.length) return <>you must first create a step</>
    if (!currentData) return <>could not find data for this step</>

    const currentTodoInfo: z.infer<typeof todoUpdateSchema> = {
        description: currentData?.description ?? '',
        stepId: currentData?.stepId ?? '',
        title: currentData?.title ?? '',
        id: currentData?.id ?? '',
    }

    return (
        <section className="mt-5 flex w-full flex-col ">
            <TodoEditForm steps={allSteps} currentTodoInfo={currentTodoInfo} />
        </section>
    )
}
