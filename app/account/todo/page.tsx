import { Button } from '@/components/ui/button'
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

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('no orgId found')

    const allTodos = await db.todo.findMany({
        where: {
            organizationId: orgId,
        },
    })

    if (!allTodos.length)
        return (
            <div>
                <p className="mb-2 text-foreground">You have no todos yet</p>
                <Link href="/account/todo/create" className="mt-5">
                    <Button>Create a new todo</Button>
                </Link>
            </div>
        )

    const properties = Object?.keys(allTodos[0]).filter(
        (property) =>
            property !== 'organizationId' &&
            property !== 'createdAt' &&
            property !== 'updatedAt'
    )

    return (
        <>
            <section className="mt-5 flex w-full flex-col items-center  ">
                <h1 className="mb-5 text-3xl font-bold">Todos</h1>
                <div className="w-4/5">
                    <Table>
                        <TableCaption>A list of your todos.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                {properties.map((property, index) => {
                                    return (
                                        <TableHead key={index}>
                                            {property}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {allTodos.map((todo) => {
                                return (
                                    <TableRow key={todo.id}>
                                        {properties.map((property, index) => {
                                            return (
                                                <TableCell key={index}>
                                                    {/* TODO look into this */}
                                                    {/* @ts-ignore */}
                                                    {group[property]}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell>
                                            <Link
                                                href={`/account/todo/${todo.id}`}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faPen}
                                                        size="sm"
                                                    />
                                                </Button>
                                            </Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </div>
                <Link href="/account/todo/create" className="mt-5">
                    <Button>Create a new todo</Button>
                </Link>
            </section>
        </>
    )
}
