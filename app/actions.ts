'use server'

import { db } from '@/lib/db'
import { revalidatePath, revalidateTag } from 'next/cache'
import { Todo } from '@prisma/client'
import { auth } from '@clerk/nextjs'
import { z } from 'zod'
import {
    chapterSchema,
    entityGroupschema,
    entitySchema,
    stepSchema,
    todoSchema,
} from '@/lib/schema/entityGroup.schema'

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

export async function createTodosForUser(todos: Todo[]) {
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

//entity groups

export async function createEntityGroup(
    data: z.infer<typeof entityGroupschema>
) {
    const { userId, orgId } = auth()

    if (!userId) {
        throw new Error('You must be signed in to modify a todo')
    }

    if (!orgId)
        throw new Error('could not find organization id in the user object')

    const validatedFields = entityGroupschema.safeParse(data)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const created = await db.entityGroup.create({
        data: {
            organizationId: orgId,
            ...validatedFields.data,
            level: Number(validatedFields.data.level),
        },
    })

    console.log('created entity group:', created)
}

//TODO - check if the user has rights to add entities to this group
export async function createEntity(data: z.infer<typeof entitySchema>) {
    const { userId, orgId } = auth()

    if (!userId) {
        throw new Error('You must be signed in to modify a todo')
    }

    if (!orgId)
        throw new Error('could not find organization id in the user object')

    const validatedFields = entitySchema.safeParse(data)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const created = await db.entity.create({
        data: {
            name: validatedFields.data.name,
            slug: validatedFields.data.slug,
            entityGroupId: validatedFields.data.entityGroupId,
            organizationId: orgId,
        },
    })

    console.log('created entity:', created)
}

export async function createChapter(data: z.infer<typeof chapterSchema>) {
    const { userId, orgId } = auth()

    if (!userId) {
        throw new Error('You must be signed in to modify a chapter')
    }

    if (!orgId)
        throw new Error('could not find organization id in the user object')

    const validatedFields = chapterSchema.safeParse(data)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const created = await db.chapter.create({
        data: {
            slug: validatedFields.data.slug,
            title: validatedFields.data.title,
            entityId: validatedFields.data.entityId,
            organizationId: orgId,
        },
    })

    revalidatePath('/account/chapter/create', 'page')

    console.log('created chapter:', created)
}

export async function createStep(data: z.infer<typeof stepSchema>) {
    const { userId, orgId } = auth()

    if (!userId) {
        throw new Error('You must be signed in to modify a todo')
    }

    if (!orgId)
        throw new Error('could not find organization id in the user object')

    const validatedFields = stepSchema.safeParse(data)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const created = await db.step.create({
        data: {
            description: validatedFields.data.description,
            slug: validatedFields.data.slug,
            title: validatedFields.data.title,
            chapterId: validatedFields.data.chapterId,
            order: validatedFields.data.order,
            videoUrl: validatedFields.data.videoUrl,
            organizationId: orgId,
        },
    })

    console.log('created step:', created)
}

export async function createTodo(data: z.infer<typeof todoSchema>) {
    const { userId, orgId } = auth()

    if (!userId) {
        throw new Error('You must be signed in to modify a todo')
    }

    if (!orgId)
        throw new Error('could not find organization id in the user object')

    const validatedFields = todoSchema.safeParse(data)

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const created = await db.todo.create({
        data: {
            description: validatedFields.data.description,
            title: validatedFields.data.title,
            stepId: validatedFields.data.stepId,
            organizationId: orgId,
        },
    })

    console.log('created todo:', created)
}

export async function setUserCompleted() {
    const { userId } = auth()

    if (!userId) {
        throw new Error('You must be signed in to perform this action')
    }

    try {
        const user = await db.user.update({
            where: {
                id: userId,
            },
            data: {
                finishedAt: new Date(),
            },
        })
        return user
    } catch (error) {
        throw new Error('could not set user as complete')
    }
}
