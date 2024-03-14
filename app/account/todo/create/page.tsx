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

    const lastTodos = await db.entityGroup.findMany({
        where: {
            organizationId: orgId,
        },
        orderBy: {
            level: 'asc',
        },
        take: 5,
    })

    let properties: any[] = []

    if (lastTodos.length) {
        properties = Object?.keys(lastTodos[0]).filter(
            (property) =>
                property !== 'organizationId' &&
                property !== 'createdAt' &&
                property !== 'updatedAt'
        )
    }

    return (
        <div>
            <TodoForm steps={allSteps} />
            <Separator className="my-16" />
            {properties.length ? (
                <section>
                    <Table>
                        <TableCaption>
                            A list of your last created chapters.
                        </TableCaption>
                        <TableHeader>
                            <TableRow>
                                {properties.map((property, index) => {
                                    return (
                                        <TableHead key={property + index}>
                                            {property}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {lastTodos.map((todo, index) => {
                                return (
                                    <TableRow key={todo.id + index}>
                                        {properties.map((property) => {
                                            return (
                                                <TableCell
                                                    key={todo.id + property}
                                                >
                                                    {/* @ts-ignore */}
                                                    {todo[property]}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell>
                                            <Link
                                                href={`/account/entity-group/${todo.id}`}
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
                </section>
            ) : null}
        </div>
    )
}
