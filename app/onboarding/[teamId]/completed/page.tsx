import { currentUser } from '@clerk/nextjs/app-beta'
import type { User } from '@clerk/nextjs/api'

import { CelebrationAnimation } from '@/components/CelebrationAnimation/CelebrationAnimation'
import { Title } from '@/components/Title/Title'
import { Box } from '@/components/Box/Box'
import { getTodosForUser } from '@/utils/requests/_requests'
import { TodoItem } from '@/components/TodoItemExperimental/TodoItem'
import { headers } from 'next/headers'
import { CompletedPageParams } from '../../types/pageProps'
import { CompleteButton } from '@/components/CompleteButton/CompleteButton'

export const dynamic = 'force-dynamic'

export default async function Page({
    params,
}: {
    params: CompletedPageParams
}) {
    const user: User | null = await currentUser()
    const host = headers().get('host')

    if (!user?.id) return <>no user was found</>

    const todos = await getTodosForUser(user.id, host!)

    const openTodos = todos?.filter((todo) => todo.completed === false)

    return (
        <>
            <section className="flex w-full flex-col items-center">
                {openTodos?.length === 0 ? (
                    <>
                        <Title> Damn, you made it! welcome to the team </Title>
                        <div className="mt-28 flex h-96 w-96 flex-col justify-center">
                            <CelebrationAnimation />
                            <CompleteButton
                                user={{ id: user.id, team: params.teamId }}
                            >
                                {' '}
                                Finish{' '}
                            </CompleteButton>
                        </div>
                    </>
                ) : (
                    <Box>
                        <Title>You have {openTodos?.length} todos left</Title>
                        <div className="mt-4 flex flex-col">
                            {openTodos?.map((todo) => (
                                <TodoItem
                                    withLink
                                    todo={todo}
                                    userId={user.id}
                                    key={todo.cmsId}
                                />
                            ))}
                        </div>
                    </Box>
                )}
            </section>
        </>
    )
}
