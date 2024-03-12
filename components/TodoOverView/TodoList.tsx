import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import { db } from '@/lib/db'
import { Todo } from '@prisma/client'
import { TodoWrapper } from '@/components/TodoWrapper/TodoWrapper'

export const TodoList = async () => {
    //get the curent user

    const { userId } = auth()

    //todo fix
    const hasCompletedAll = false

    if (!userId) return <>no user was found</>

    const todos = await db.todo.findMany({
        where: {
            userTodos: {
                some: {
                    userId,
                },
            },
        },
    })

    const completedTodos = await db.userTodo.findMany({
        where: {
            userId,
            isCompleted: true,
        },
    })

    // map the todos check which todos are completed and assign them completed true

    const renderTodos: Array<Todo & { completed: boolean }> = todos.map(
        (todo) => {
            return {
                ...todo,
                completed: completedTodos.some(
                    (completedTodo) => completedTodo.todoId === todo.id
                ),
            }
        }
    )

    if (!todos?.length) {
        return <p className="text-center text-white">You have no todos yet</p>
    }

    return (
        <div className="flex flex-col">
            <TodoWrapper todos={renderTodos} withFilter />
            {hasCompletedAll ? (
                <Link href={`/onboarding/overview`}>
                    <button className="mt-9 w-full rounded-md bg-pink px-6 py-3 text-xl font-bold text-white">
                        {' '}
                        Overview
                    </button>
                </Link>
            ) : null}
        </div>
    )
}
