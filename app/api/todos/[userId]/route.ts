import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { TodoForDb } from '@/app/onboarding/types/todo'

export async function GET(
    request: NextRequest,
    context: { params: { userId: string } }
) {
    // getting the user here would be better but it is not working atm
    // const { userId } = auth();

    //TODO: because of server and client render this is not working find a way to get arount this

    // const user = await currentUser();

    const userId = context.params.userId

    if (!userId) return NextResponse.json([])

    const todos = await db.todo
        .findMany({
            where: {
                owner: userId,
            },
        })
        .catch((err) => {
            console.log(err)
        })

    return NextResponse.json(todos ?? [])
}

export async function POST(
    request: NextRequest,
    context: { params: { userId: string } }
) {
    // getting the user here would be better but it is not working atm
    // const { userId } = auth();

    //TODO: because of server and client render this is not working find a way to get arount this

    // const user = await currentUser();

    const userId = context.params.userId

    if (!userId || !request?.body) return NextResponse.json([])

    const req: TodoForDb[] = await request.json()

    console.log('adding these: ', req)

    const todos = await db.todo
        .createMany({
            data: [...req],
        })
        .catch((err) => {
            console.log(err)
        })

    return NextResponse.json(todos || [])
}
