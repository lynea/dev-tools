import { FunctionComponent } from 'react'
import { Card, CardContent, CardTitle } from '../ui/card'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'

export const StartedCard: FunctionComponent = async () => {
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

    const started = allUsers.filter((user) => user.startedAt).length

    return (
        <Card>
            <CardContent className="item flex h-full flex-col items-center justify-center">
                <CardTitle className="my-2 text-sm font-semibold tracking-wide">
                    Started onboarding
                </CardTitle>
                <p className="text-9xl"> {started} </p>
            </CardContent>
        </Card>
    )
}
