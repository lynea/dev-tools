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

    const allSteps = await db.chapter.findMany({
        where: {
            organizationId: orgId,
        },
        orderBy: {
            order: 'asc',
        },
    })

    if (!allSteps.length) return <p>No groups found</p>

    const properties = Object?.keys(allSteps[0])

    return (
        <>
            <section className="mt-5 flex w-full flex-col items-center  ">
                <h1 className="mb-5 text-3xl font-bold">Steps</h1>
                <div className="w-4/5">
                    <Table>
                        <TableCaption>A list of your steps.</TableCaption>
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
                            {allSteps.map((group) => {
                                return (
                                    <TableRow key={group.id}>
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
                <Link href="/account/step/create" className="mt-5">
                    <Button>Create a new step</Button>
                </Link>
            </section>
        </>
    )
}
