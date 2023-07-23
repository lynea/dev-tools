'use client'

import { Todo } from '@prisma/client'
import { FunctionComponent, useTransition } from 'react'
import { createOrMutateTodo } from '../../app/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { TodoForDb } from '@/app/onboarding/types/todo'

interface TodoItemProps {
    todo: TodoForDb
    userId: string
}

//passing userId is not ideal will have to fix
export const TodoItem: FunctionComponent<TodoItemProps> = ({
    todo,
    userId,
}) => {
    let [isPending, startTransition] = useTransition()

    if (isPending)
        return (
            <FontAwesomeIcon
                icon={faSpinner}
                spinPulse
                className="self-start text-white"
            />
        )

    return (
        <div className="flex items-center  ">
            <input
                type="checkbox"
                id={todo.cmsId}
                className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 "
                checked={todo?.completed}
                onChange={() =>
                    // @ts-ignore
                    startTransition(() => createOrMutateTodo(userId, todo))
                }
            />

            <label
                htmlFor={todo.cmsId}
                className="ml-2 w-full py-4 text-sm  font-bold text-white"
            >
                {' '}
                {todo?.body}
            </label>
        </div>
    )
}
