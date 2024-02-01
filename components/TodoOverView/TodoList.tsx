import { getTodosForUser } from '@/utils/requests/_requests'
import { currentUser } from '@clerk/nextjs'
import { User } from '@clerk/nextjs/dist/types/server'
import { headers } from 'next/headers'
import { TodoWrapper } from '../TodoWrapper/TodoWrapper'
import Link from 'next/link'
import { db } from '@/lib/db'

export const TodoList = async () => {
    //get the curent user
    const user: User | null = await currentUser()
    const host = headers().get('host')

    const dbUser = await db.user.findFirst({
        where: {
            id: user?.id,
        },
    })

    const hasCompletedAll = dbUser?.hasCompleted

    if (!user) return <>no user was found</>

    const todos = await getTodosForUser(user.id, host!)

    if (!todos?.length) {
        return <p className="text-center text-white">You have no todos yet</p>
    }

    return (
        <div className="flex flex-col">
            <TodoWrapper userId={user.id} todos={todos} withFilter withLink />
            {hasCompletedAll ? (
                <Link href={`/onboarding/overview`}>
                    <button className="mt-9 w-full rounded-md bg-pink-600 px-6 py-3 text-xl font-bold text-white">
                        {' '}
                        Overview
                    </button>
                </Link>
            ) : null}
        </div>
    )
}
