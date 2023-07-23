import { getTodosForUser } from '@/utils/requests/_requests'
import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/dist/types/server'
import { TodoItem } from '../TodoItemExperimental/TodoItem'

export const TodoList = async () => {
    //get the curent user
    const user: User | null = await currentUser()

    if (!user) return <>no user was found</>

    const todos = await getTodosForUser(user.id)

    return (
        <div className="flex flex-col">
            {todos?.map((todo) => (
                <TodoItem todo={todo} userId={user.id} key={todo.id} />
            ))}
        </div>
    )
}
