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

    const allchapters = await db.chapter.findMany({
        where: {
            organizationId: orgId,
        },
        orderBy: {
            order: 'asc',
        },
    })

    console.log('all!', allchapters)

    if (allchapters?.length < 1) return <p>No groups found</p>

    //remove organizationId from the list of properties
    const properties = Object?.keys(allchapters[0]).filter(
        (property) =>
            property !== 'organizationId' &&
            property !== 'createdAt' &&
            property !== 'updatedAt'
    )

    return (
        <>
            <section className="mt-5 flex w-full flex-col items-center  ">
                <h1 className="mb-5 text-3xl font-bold">Chapters</h1>
                <div className="w-4/5">
                    <Table>
                        <TableCaption>A list of your chapters.</TableCaption>
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
                            {allchapters.map((group, index) => {
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
                </div>
                <Link href="/account/chapter/create" className="mt-5">
                    <Button>Create a new chapter</Button>
                </Link>
            </section>
        </>
    )
}
