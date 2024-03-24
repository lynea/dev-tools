import { EntityGroupTable } from '@/components/EntityGroupTable/EntityGroupTable'
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

    return (
        <>
            <section className="mt-5 flex w-full flex-col items-center  ">
                <h1 className="mb-5 text-3xl font-bold">Entity groups</h1>
                <div className="w-4/5">
                    <EntityGroupTable limit={100} />
                </div>
                <Link href="/account/entity-group/create" className="mt-5">
                    <Button>Create a new entity group</Button>
                </Link>
            </section>
        </>
    )
}
