import { currentUser } from '@clerk/nextjs/app-beta'
import type { User } from '@clerk/nextjs/api'

import Link from 'next/link'
import { CelebrationAnimation } from '@/components/CelebrationAnimation/CelebrationAnimation'
import { Title } from '@/components/Title/Title'
import { Box } from '@/components/Box/Box'
import { getTodosForUser } from '@/utils/requests/_requests'
import { TodoItem } from '@/components/TodoItemExperimental/TodoItem'
import { TodoOverView } from '@/components/TodoOverView/TodoOverview'
import { TodoList } from '@/components/TodoOverView/TodoList'

export const dynamic = 'force-dynamic'

export default async function Page() {
    const user: User | null = await currentUser()

    if (!user?.id) return <>no user was found</>

    const todos = await getTodosForUser(user.id)

    const openTodos = todos?.filter((todo) => todo.completed === false)

    return (
        <section className="flex w-full flex-col items-center">
            {openTodos?.length === 0 ? (
                <>
                    <Title> Damn, you made it! welcome to the team </Title>
                    <div className="flex h-96 w-96 justify-center">
                        <CelebrationAnimation />
                    </div>
                </>
            ) : (
                <Box>
                    <Title>You have {openTodos?.length} todos left</Title>
                    <div className="mt-4 flex flex-col">
                        {openTodos?.map((todo) => (
                            <TodoItem
                                todo={todo}
                                userId={user.id}
                                key={todo.cmsId}
                            />
                        ))}
                    </div>
                </Box>
            )}
            <TodoOverView>
                {/* @ts-ignore */}
                <TodoList />
            </TodoOverView>
        </section>
    )
}
