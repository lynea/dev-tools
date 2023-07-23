import { TodoForDb } from '@/app/onboarding/types/todo'
import { Todo } from '@prisma/client'

export const getTodosForUser = async (userId: string): Promise<Todo[]> => {
    const res = await fetch(`/api/todos/${userId}`, {
        headers: {},
        cache: 'no-cache',
        next: {
            tags: ['todos'],
        },
    })

    if (!res.ok) {
        console.error('Failed to fetch todos for user')
        throw new Error('Failed to fetch todos for user')
    }

    return res.json()
}

export const createTodosForUser = async (
    userId: string,
    todos: TodoForDb[]
): Promise<Todo[]> => {
    const res = await fetch(`/api/todos/${userId}`, {
        headers: {},
        body: JSON.stringify(todos),
        method: 'POST',
        cache: 'no-cache',
        next: {
            tags: ['create-todos'],
        },
    })

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        throw new Error('Failed to post todos')
    }

    return res.json()
}
