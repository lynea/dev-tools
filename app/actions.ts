'use server'

import { db } from '@/lib/db'
import { revalidateTag } from 'next/cache'
import { TodoForDb } from './onboarding/types/todo'
import { User, UserSchema } from '@/lib/schema/user.schema'

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

    //check if its already in the db for this user

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
                    completed: true,
                    owner: userId,
                },
            })
        }
    }

    revalidateTag('todos')
}

export async function createOrUpdateUser(
    user: User,
    hasCompleted: boolean | undefined
) {
    const validationResult = UserSchema.safeParse(user)

    if (!validationResult.success) {
        throw new Error(validationResult.error.message)
    }

    const res = await db.user.upsert({
        where: { id: user.id },
        update: { ...user, hasCompleted },
        create: { ...user, hasCompleted },
    })

    return res
}
