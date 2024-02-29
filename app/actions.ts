'use server'

import { db } from '@/lib/db'
import { revalidatePath, revalidateTag } from 'next/cache'
import { User, UserSchema } from '@/lib/schema/user.schema'
import { Todo } from '@prisma/client'
import { auth } from '@clerk/nextjs'

//we can create them when page loads e.g. filter out the ones that are not in the db yet

export async function updateTodo(todo: Todo, completed: boolean | undefined) {
    console.log('got a todo with status: ', completed)

    const { userId } = auth()

    if (!userId) {
        throw new Error('You must be signed in to modify a todo')
    }

    // Ensure the user exists
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
    })

    if (!user) {
        throw new Error('user with id: ' + userId + ' does not exist')
    }

    const res = await db.userTodo
        .upsert({
            where: {
                userId_todoId: {
                    userId: userId,
                    todoId: todo.id,
                },
            },
            update: {
                isCompleted: !completed,
            },
            create: {
                userId: userId,
                todoId: todo.id,
                isCompleted: true,
            },
        })
        .catch((err) => {
            console.log(err)
        })

    console.log('dbResponse:', res)

    revalidatePath(
        '/onboarding/[groupSlug]/[entitySlug]/[chapterId]/[stepId]',
        'page'
    )
}

export async function createTodos(todos: Todo[]) {
    const { userId } = auth()

    if (!userId) {
        throw new Error('You must be signed in to modify a todo')
    }

    //check which ones are already in the db
    const existingTodos = await db.userTodo.findMany({
        where: {
            userId: userId,
        },
    })

    const newTodos = todos.filter((todo) => {
        return !existingTodos.some((existingTodo) => {
            return existingTodo.todoId === todo.id
        })
    })

    if (newTodos?.length === 0) {
        return
    }

    console.log('found new todos creating them:', newTodos)

    const userTodos = await db.userTodo.createMany({
        data: todos.map((todo) => {
            return {
                userId: userId,
                todoId: todo.id,
                isCompleted: false,
            }
        }),
    })

    console.log('created todos:', userTodos)
    revalidatePath(
        '/onboarding/[groupSlug]/[entitySlug]/[chapterId]/[stepId]',
        'page'
    )
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
        update: { ...user },
        create: { ...user },
    })

    return res
}
