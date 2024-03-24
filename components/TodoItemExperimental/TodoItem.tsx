'use client'
import { FunctionComponent, useTransition } from 'react'
import { updateTodoStatus } from '../../app/actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { RenderTodo } from '../TodoWrapper/TodoWrapper'
import { Checkbox } from '../ui/checkbox'

interface TodoItemProps {
    todo: RenderTodo
    withLink?: boolean
}

//needs to know which entity it belongs to
//

//passing userId is not ideal will have to fix
export const TodoItem: FunctionComponent<TodoItemProps> = ({
    todo,
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
                    className=" text-foreground"
                />
            ) : (
                <Checkbox
                    id={todo.id}
                    disabled={isPending}
                    checked={todo?.completed}
                    onClick={() =>
                        startTransition(() =>
                            updateTodoStatus(todo, todo.completed)
                        )
                    }
                />
            )}

            <label
                htmlFor={todo.id}
                className="ml-2 w-full py-4 text-sm  font-bold text-foreground"
            >
                {' '}
                {todo?.description}
            </label>

            {/* {withLink && (
                <Link
                    href={`/onboarding/${teamId ?? 'global'}s/${todo.stepId}`}
                >
                    <FontAwesomeIcon
                        icon={faSquareArrowUpRight}
                        className=" ml-3 text-foreground"
                    />
                </Link>
            )} */}
        </div>
    )
}
