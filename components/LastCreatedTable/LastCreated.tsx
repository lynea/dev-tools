import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Button } from '../ui/button'
import {
    Table,
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '../ui/table'
import { Card } from '../ui/card'

type EntryTableProps = {
    getEntities: () => Promise<any[]>
    entryName: string
    editPath: string
}

export const EntryTable: FunctionComponent<EntryTableProps> = async ({
    getEntities,
    entryName,
    editPath,
}) => {
    let properties: any[] = []

    const entries = await getEntities()

    if (entries.length) {
        properties = Object?.keys(entries[0]).filter(
            (property) =>
                property !== 'organizationId' &&
                property !== 'createdAt' &&
                property !== 'updatedAt'
        )
    }

    return (
        <>
            {properties.length ? (
                <section>
                    <Card className="pb-2">
                        <Table>
                            <TableCaption>
                                A list of your last created {entryName}
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
                                {entries.map((entry, index) => {
                                    return (
                                        <TableRow key={entry.id + index}>
                                            {properties.map((property) => {
                                                return (
                                                    <TableCell
                                                        key={
                                                            entry.id + property
                                                        }
                                                    >
                                                        {/* @ts-ignore */}
                                                        {entry[property]}
                                                    </TableCell>
                                                )
                                            })}
                                            <TableCell>
                                                <Link
                                                    href={`${editPath}/${entry.id}`}
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
                    </Card>
                </section>
            ) : null}
        </>
    )
}
