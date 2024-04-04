import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'
import { deleteTodo } from '@/app/actions'

type TodoTableProps = {
    limit: number
    query?: string
}

export const TodoTable: FunctionComponent<TodoTableProps> = async ({
    limit,
    query,
}) => {
    const { orgId } = auth()

    const getLastTodos = async () => {
        const steps = await db.todo.findMany({
            where: {
                organizationId: orgId,
                title: {
                    contains: query ?? '',
                },
            },
            include: {
                step: true,
            },
            take: limit,
        })

        const withStep = steps.map((todo) => {
            return {
                id: todo.id,
                title: todo.title,
                description: todo.description,
                step: todo.step.title,
            }
        })

        return withStep
    }

    const todos = await getLastTodos()

    return (
        <EntryTable
            deleteAction={deleteTodo}
            entries={todos}
            entryName="todos"
            editPath="/account/todo/"
        />
    )
}
