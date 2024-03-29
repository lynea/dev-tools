import { EntityTable } from '@/components/EntityTable/EntityTable'
import { Search } from '@/components/Search/Search'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { auth } from '@clerk/nextjs'

import Link from 'next/link'
import { Suspense } from 'react'

export default async function Page({
    searchParams,
}: {
    searchParams?: {
        query?: string
        group?: string
    }
}) {
    const { orgId } = auth()

    if (!orgId) throw new Error('no orgId found')

    const query = searchParams?.query || ''
    const group = searchParams?.group || undefined

    return (
        <>
            <section className="mt-5 flex w-full flex-col items-center  ">
                <h1 className="mb-5 text-3xl font-bold">Entities</h1>
                <div className="w-4/5 space-y-3 ">
                    <Search placeholder="Search entities" />
                    <Suspense
                        key={query}
                        fallback={
                            <Skeleton className="mt-6 h-20 w-full rounded-xl" />
                        }
                    >
                        <EntityTable limit={100} query={query} group={group} />
                    </Suspense>
                </div>
                <Link href="/account/entity/create" className="mt-5">
                    <Button>Create a new entity</Button>
                </Link>
            </section>
        </>
    )
}
