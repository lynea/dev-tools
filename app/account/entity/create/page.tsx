import { db } from '@/lib/db'
import { EntityForm } from './EntityForm'
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

    const entityGroups = await db.entityGroup.findMany({
        where: {
            organizationId: orgId,
        },
    })

    const lastEntities = await db.entity.findMany({
        where: {
            organizationId: orgId,
        },

        take: 5,
    })

    let properties: any[] = []

    if (lastEntities.length) {
        properties = Object?.keys(lastEntities[0]).filter(
            (property) =>
                property !== 'organizationId' &&
                property !== 'createdAt' &&
                property !== 'updatedAt'
        )
    }

    return (
        <div>
            <EntityForm entityGroups={entityGroups} />
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
                            {lastEntities.map((group, index) => {
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
