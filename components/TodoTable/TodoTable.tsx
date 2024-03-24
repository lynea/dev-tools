import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { FunctionComponent } from 'react'
import { EntryTable } from '../LastCreatedTable/LastCreated'

type TodoTableProps = {
    limit: number
}

export const TodoTable: FunctionComponent<TodoTableProps> = async ({
    limit,
}) => {
    const { orgId } = auth()

    const getLastTodos = async () => {
        return await db.todo.findMany({
            where: {
                organizationId: orgId,
            },
            take: limit,
        })
    }

    return (
        <EntryTable
            getEntities={getLastTodos}
            entryName="todos"
            editPath="/account/todo/"
        />
    )
}
