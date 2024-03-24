/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/HJuaG0lAsWs
 */

import { CardTitle, CardContent, Card } from '@/components/ui/card'

import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from '@/components/ui/table'
import { FunctionComponent, Suspense } from 'react'
import { User } from '@prisma/client'
import dayjs from 'dayjs'
import { StartedCard } from './Card/StartedCard'
import { FinishedCard } from './Card/FinishedCard'
import { AvarageCard } from './Card/AverageCard'
import { Skeleton } from './ui/skeleton'

type DashboardProps = {
    users: User[]
}

export const Dashboard: FunctionComponent<DashboardProps> = async ({
    users,
}) => {
    return (
        <>
            <div className="grid gap-4 md:grid-cols-2">
                <Suspense
                    fallback={
                        <Skeleton className="mt-6 h-40 w-full rounded-xl" />
                    }
                >
                    <StartedCard />
                </Suspense>
                <Suspense
                    fallback={
                        <Skeleton className="mt-6 h-40 w-full rounded-xl" />
                    }
                >
                    <AvarageCard />
                </Suspense>
                <Suspense
                    fallback={
                        <Skeleton className="mt-6 h-40 w-full rounded-xl" />
                    }
                >
                    <FinishedCard />
                </Suspense>
            </div>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead className="hidden md:table-cell">
                                Email
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Start date
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                completed
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users?.map((user) => {
                            return (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {user.id}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        not implemented
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {user?.startedAt
                                            ? dayjs(user.startedAt).format(
                                                  'DD/MM/YYYY'
                                              )
                                            : 'not started'}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {user?.finishedAt
                                            ? dayjs(user.finishedAt).format(
                                                  'DD/MM/YYYY'
                                              )
                                            : 'not completed'}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}
