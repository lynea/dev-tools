'use client'

import { FunctionComponent, useEffect, useState } from 'react'
import { TodoItem } from '../TodoItemExperimental/TodoItem'
import { Todo } from '@prisma/client'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'

export type RenderTodo = Todo & { completed: boolean }

type TodoWrapperProps = {
    todos: Array<RenderTodo>
    withFilter?: boolean
    withLink?: boolean
}

export const TodoWrapper: FunctionComponent<TodoWrapperProps> = ({
    todos,
    withFilter = false,
    withLink = false,
}) => {
    const [filter, setFilter] = useState(withFilter)
    const [todosToShow, setTodosToShow] = useState<RenderTodo[]>()
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
                <div className="mr-2 mt-[0.3rem] flex items-center space-x-2">
                    <Switch
                        id="todo-filter"
                        onClick={() => setFilter(!filter)}
                    />
                    <Label htmlFor="todo-filter">Show completed todos</Label>
                </div>
            ) : null}
            {todosToShow?.map((todo, index) => (
                <TodoItem
                    todo={todo}
                    key={todo.id + index}
                    withLink={withLink}
                />
            ))}
        </>
    )
}
