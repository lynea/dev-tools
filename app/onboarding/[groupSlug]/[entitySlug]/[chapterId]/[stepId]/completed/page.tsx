import { currentUser } from '@clerk/nextjs'
import type { User } from '@clerk/nextjs/api'

import { CelebrationAnimation } from '@/components/CelebrationAnimation/CelebrationAnimation'
import { Title } from '@/components/Title/Title'
import { Box } from '@/components/Box/Box'
import { getTodosForUser } from '@/utils/requests/_requests'
import { TodoItem } from '@/components/TodoItemExperimental/TodoItem'
import { headers } from 'next/headers'
import { CompleteButton } from '@/components/CompleteButton/CompleteButton'
import { CompletedPageParams } from '@/app/onboarding/types/pageProps'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export default async function Page({
    params,
}: {
    params: CompletedPageParams
}) {
    const user: User | null = await currentUser()
    const host = headers().get('host')

    if (!user?.id) return <>no user was found</>

    const userTodos = await db.userTodo.findMany({
        where: {
            userId: user.id,
            isCompleted: false,
        },
        include: {
            todo: true,
        },
    })

    const renderTodos = userTodos?.map((userTodo) => {
        return { ...userTodo.todo, completed: userTodo.isCompleted }
    })

    //TODO: create a way to connect users to entities. they can see the entities they are connected to and the ones they are not connected to.
    // however they will only see the todos for the entities they are connected to.
    // i need to create a ui where the an admin can select users per entity.
    // i need to create a database table that connects users to entities.
    // then i can fetch the entities a user is connected to

    // a todo should be able to link to : "onboarding/overview/:groupId/:entityId/:chapterId/:stepId"

    // currently i only have the chapter
    // i can reverse when a user clicks on a todo to get the parents from the cms

    return (
        <>
            <section className="mt-14 flex w-full flex-col items-center">
                {renderTodos?.length === 0 ? (
                    <>
                        <Title> Damn, you made it! welcome to the team </Title>
                        <div className="mt-28 flex h-96 w-96 flex-col justify-center">
                            <CelebrationAnimation />
                            <CompleteButton user={{ id: user.id }}>
                                {' '}
                                Finish{' '}
                            </CompleteButton>
                        </div>
                    </>
                ) : (
                    <Box>
                        <Title>You have {renderTodos?.length} todos left</Title>
                        <div className="mt-4 flex flex-col">
                            {renderTodos?.map((renderTodo) => (
                                <TodoItem
                                    withLink
                                    todo={renderTodo}
                                    key={renderTodo.id}
                                />
                            ))}
                        </div>
                    </Box>
                )}
            </section>
        </>
    )
}
