import { db } from '@/lib/db'
import { ChapterForm } from './ChapterForm'
import { auth } from '@clerk/nextjs'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('No organization found')

    const lastChapters = await db.chapter.findMany({
        where: {
            organizationId: orgId,
        },
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
    })

    let properties: any[] = []

    if (lastChapters.length) {
        properties = Object?.keys(lastChapters[0]).filter(
            (property) =>
                property !== 'organizationId' &&
                property !== 'createdAt' &&
                property !== 'updatedAt'
        )
    }

    //  properties = Object?.keys(lastChapters[0]).filter(
    //     (property) =>
    //         property !== 'organizationId' &&
    //         property !== 'createdAt' &&
    //         property !== 'updatedAt'
    // )

    const entities = await db.entity.findMany({
        where: {
            organizationId: orgId,
        },
    })

    if (!entities.length) return <>you must first create an entity</>

    return (
        <div>
            <ChapterForm entityGroups={entities} />{' '}
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
                            {lastChapters.map((group, index) => {
                                return (
                                    <TableRow key={group.id + index}>
                                        {properties.map((property) => {
                                            return (
                                                <TableCell
                                                    key={group.id + property}
                                                >
                                                    {/* @ts-ignore */}
                                                    {group[property]}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell>
                                            <Link
                                                href={`/account/entity-group/${group.id}`}
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
