import { FunctionComponent } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import dayjs from 'dayjs'

export const AvarageCard: FunctionComponent = async () => {
    const { orgId } = auth()

    if (!orgId) return null

    const allUsers = await db.user.findMany({
        where: {
            userOrganizations: {
                some: {
                    organizationId: orgId,
                },
            },
        },
    })

    const completionTimes: number[] = []
    allUsers.forEach((user) => {
        if (user.startedAt && user.finishedAt) {
            const start = dayjs(user.startedAt)
            const end = dayjs(user.finishedAt)
            const duration = end.diff(start, 'hour')
            completionTimes.push(duration)
        }
    })

    const avarage =
        completionTimes.length > 0
            ? completionTimes?.reduce((acc, val) => acc + val, 0) /
                  completionTimes?.length ?? 0
            : 0

    if (avarage === 0) return null

    return (
        <Card>
            <CardContent className="item flex h-full flex-col items-center justify-center">
                <CardTitle className="my-2 text-sm font-semibold tracking-wide">
                    Avarage completion time in minutes
                </CardTitle>
                <p className="text-9xl"> {avarage} </p>
            </CardContent>
        </Card>
    )
}
