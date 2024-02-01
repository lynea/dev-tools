'use client'

import { TodoForDb } from '@/app/onboarding/types/todo'
import { FunctionComponent, useEffect, useState } from 'react'
import { TodoItem } from '../TodoItemExperimental/TodoItem'

// a todoWrapper fetches a list of todos from an api enpoint
// when clicked it adds it to the db
// then refetches the list of todos

type TodoWrapperProps = {
    todos: TodoForDb[]
    userId: string
    withFilter?: boolean
    withLink?: boolean
}

export const TodoWrapper: FunctionComponent<TodoWrapperProps> = ({
    todos,
    userId,
    withFilter = false,
    withLink = false,
}) => {
    const [filter, setFilter] = useState(withFilter)
    const [todosToShow, setTodosToShow] = useState<TodoForDb[]>()
    useEffect(() => {
        const filtered = filter
            ? todos.filter((todo) => !todo.completed)
            : todos

        setTodosToShow(
            filtered.sort((a, b) => {
                if (a.completed && !b.completed) return 1
                if (!a.completed && b.completed) return -1
                return 0
            })
        )
    }, [todos, filter])

    return (
        <>
            {withFilter ? (
                <div className="mt-7 flex">
                    <input
                        className=" mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-white before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-pink-400 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-purple-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-purple-500 checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-purple-500 checked:focus:bg-purple-500 checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        onChange={() => setFilter(!filter)}
                    />
                    <label
                        className="mr-6 inline-block pl-[0.15rem] text-white hover:cursor-pointer"
                        htmlFor="flexSwitchCheckDefault"
                    >
                        {`${filter ? 'Show' : 'Hide'} completed`}
                    </label>
                </div>
            ) : null}
            {todosToShow?.map((todo, index) => (
                <TodoItem
                    userId={userId}
                    todo={todo}
                    key={todo.cmsId + index}
                    withLink={withLink}
                />
            ))}
        </>
    )
}
