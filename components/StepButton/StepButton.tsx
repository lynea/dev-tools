'use client'

import { FunctionComponent } from 'react'
import { Button } from '../Button/Button'
import { useRouter } from 'next/navigation'

import { createTodosForUser, getTodosForUser } from '@/utils/requests/_requests'
import { TodoForDb } from '@/app/onboarding/types/todo'
import { createOrMutateTodo, createTodos } from '@/app/actions'

type StepButtonProps = {
    todoInfo: TodoForDb[]
    route: string
    userId: string
    host: string
}

//TODO: when pressed add all todos that are not currently completed to the db
// filter out all todos that are not completed
// check if already in db
// if not add to db

export const StepButton: FunctionComponent<StepButtonProps> = ({
    route,
    todoInfo,
    userId,
    host,
}) => {
    const router = useRouter()

    console.log('route', route)

    const handleClick = async () => {
        const dbTodos = await getTodosForUser(userId, host)
        if (!userId) {
            console.error('no user id was provided')
            return
        }

        console.log('todoInfo', todoInfo)

        const todosToBeAdded = todoInfo.filter(
            (todo) => !dbTodos?.some((dbTodo) => dbTodo.cmsId === todo.cmsId)
        )

        if (todosToBeAdded?.length) {
            await createTodos(userId, todosToBeAdded)

            router.push(route)
        } else {
            router.refresh()
            router.push(route)
        }
    }

    return (
        <Button disabled onClick={handleClick} className="order-2 lg:order-3">
            Next
        </Button>
    )
}
