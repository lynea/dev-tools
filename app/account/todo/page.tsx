import { TodoTable } from '@/components/TodoTable/TodoTable'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { db } from '@/lib/db'
import { auth } from '@clerk/nextjs'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('no orgId found')

    return (
        <>
            <section className="mt-5 flex w-full flex-col items-center  ">
                <h1 className="mb-5 text-3xl font-bold">Todos</h1>
                <div className="w-4/5">
                    <Suspense
                        fallback={
                            <Skeleton className="mt-6 h-20 w-full rounded-xl" />
                        }
                    >
                        <TodoTable limit={100} />
                    </Suspense>
                </div>
                <Link href="/account/todo/create" className="mt-5">
                    <Button>Create a new todo</Button>
                </Link>
            </section>
        </>
    )
}
