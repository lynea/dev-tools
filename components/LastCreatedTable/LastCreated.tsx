import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { FunctionComponent } from 'react'
import { Button } from '../ui/button'
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from '../ui/table'
import { Card } from '../ui/card'
import { DeleteEntry } from '../DeleteEntry/DeleteEntry'

type EntryTableProps = {
    entries: any[]
    entryName: string
    editPath: string
    deleteAction: any
}

export const EntryTable: FunctionComponent<EntryTableProps> = async ({
    entries,
    entryName,
    editPath,
    deleteAction,
}) => {
    let properties: any[] = []

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
                    <Card className="p-2">
                        <Table>
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
                                            <TableCell className="flex gap-4">
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

                                                <DeleteEntry
                                                    entryId={entry.id}
                                                    deleteAction={deleteAction}
                                                />
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
