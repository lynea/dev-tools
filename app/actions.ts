'use server'

import { db } from '@/lib/db'
import { revalidateTag } from 'next/cache'
import { TodoForDb } from './onboarding/types/todo'

//we can create them when page loads e.g. filter out the ones that are not in the db yet

export async function createOrMutateTodo(userId: string, todo: TodoForDb) {
    const dbTodos = await db.todo
        .findMany({
            where: {
                owner: userId,
            },
        })
        .catch((err) => {
            console.log(err)
        })

    //check if its already in the db

    if (dbTodos) {
        const alreadyExtistingTodo = dbTodos.find(
            (dbTodo) => dbTodo.cmsId === todo.cmsId
        )

        if (alreadyExtistingTodo) {
            console.log('updating')
            //update the todo
            const res = await db.todo.update({
                where: {
                    id: alreadyExtistingTodo.id,
                },
                data: {
                    completed: !todo.completed,
                },
            })
        } else {
            console.log('creating')
            const res = await db.todo.create({
                data: {
                    ...todo,
                    owner: userId,
                },
            })
        }
    }

    revalidateTag('todos')
}
