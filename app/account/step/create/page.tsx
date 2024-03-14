import { db } from '@/lib/db'
import { StepForm } from './StepForm'
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

    const chapters = await db.chapter.findMany({
        where: {
            organizationId: orgId,
        },
    })

    if (!chapters.length) return <>you must first create a chapter</>

    const lastSteps = await db.entityGroup.findMany({
        where: {
            organizationId: orgId,
        },
        orderBy: {
            level: 'asc',
        },
        take: 5,
    })

    let properties: any[] = []

    if (lastSteps.length) {
        properties = Object?.keys(lastSteps[0]).filter(
            (property) =>
                property !== 'organizationId' &&
                property !== 'createdAt' &&
                property !== 'updatedAt'
        )
    }

    return (
        <div>
            <StepForm chapters={chapters} />
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
                            {lastSteps.map((step, index) => {
                                return (
                                    <TableRow key={step.id + index}>
                                        {properties.map((property) => {
                                            return (
                                                <TableCell
                                                    key={step.id + property}
                                                >
                                                    {/* @ts-ignore */}
                                                    {step[property]}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell>
                                            <Link
                                                href={`/account/step/${step.id}`}
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
