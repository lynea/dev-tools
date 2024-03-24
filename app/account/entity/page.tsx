import { EntityTable } from '@/components/EntityTable/EntityTable'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { auth } from '@clerk/nextjs'

import Link from 'next/link'
import { Suspense } from 'react'

export default async function Page() {
    const { orgId } = auth()

    if (!orgId) throw new Error('no orgId found')

    return (
        <>
            <section className="mt-5 flex w-full flex-col items-center  ">
                <h1 className="mb-5 text-3xl font-bold">Entities</h1>
                <div className="w-4/5">
                    <Suspense
                        fallback={
                            <Skeleton className="mt-6 h-20 w-full rounded-xl" />
                        }
                    >
                        <EntityTable limit={100} />
                    </Suspense>
                </div>
                <Link href="/account/entity/create" className="mt-5">
                    <Button>Create a new entity</Button>
                </Link>
            </section>
        </>
    )
}
