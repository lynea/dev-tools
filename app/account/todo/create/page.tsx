import { db } from '@/lib/db'
import { TodoForm } from './TodoForm'
import { auth } from '@clerk/nextjs'
import { Separator } from '@/components/ui/separator'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { TodoTable } from '@/components/TodoTable/TodoTable'

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const allSteps = await db.step.findMany({
        where: {
            organizationId: orgId,
        },
        orderBy: {
            order: 'asc',
        },
    })

    if (!allSteps.length) return <>you must first create a step</>

    return (
        <div>
            <TodoForm steps={allSteps} />
            <Separator className="my-16" />
            <Suspense
                fallback={<Skeleton className="mt-6 h-20 w-full rounded-xl" />}
            >
                <TodoTable limit={5} />
            </Suspense>
        </div>
    )
}
