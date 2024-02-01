'use client'

import { Todo } from '@prisma/client'
import { FunctionComponent, useTransition } from 'react'
import { createOrMutateTodo } from '../../app/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faSpinner,
    faSquareArrowUpRight,
} from '@fortawesome/free-solid-svg-icons'
import { TodoForDb } from '@/app/onboarding/types/todo'
import Link from 'next/link'

interface TodoItemProps {
    todo: TodoForDb
    userId: string
    withLink?: boolean
    teamId?: string
}

//passing userId is not ideal will have to fix
export const TodoItem: FunctionComponent<TodoItemProps> = ({
    todo,
    userId,
    teamId,
    withLink = false,
}) => {
    let [isPending, startTransition] = useTransition()

    //TODO: maybe based on the id i can go up the tree and find the chapter and step
    return (
        <div className="flex items-center  ">
            {isPending ? (
                <FontAwesomeIcon
                    icon={faSpinner}
                    spinPulse
                    className=" text-white"
                />
            ) : (
                <input
                    type="checkbox"
                    id={todo.cmsId}
                    disabled={isPending}
                    className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-pink-500 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 "
                    checked={todo?.completed}
                    onChange={() =>
                        // @ts-ignore
                        startTransition(() => createOrMutateTodo(userId, todo))
                    }
                />
            )}

            <label
                htmlFor={todo.cmsId}
                className="ml-2 w-full py-4 text-sm  font-bold text-white"
            >
                {' '}
                {todo?.body}
            </label>

            {withLink && (
                <Link
                    href={`/onboarding/${teamId ?? 'global'}/${
                        todo.chapterId
                    }/${todo.stepId}`}
                >
                    <FontAwesomeIcon
                        icon={faSquareArrowUpRight}
                        className=" ml-3 text-white"
                    />
                </Link>
            )}
        </div>
    )
}
