import { Search } from '@/components/Search/Search'
import { StepTable } from '@/components/StepTable/StepTable'
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
    }
}) {
    const { orgId } = auth()

    if (!orgId) throw new Error('no orgId found')

    const query = searchParams?.query || ''

    return (
        <>
            <section className="mt-5 flex w-full flex-col items-center  ">
                <h1 className="mb-5 text-3xl font-bold">Steps</h1>
                <div className="w-4/5 space-y-3">
                    <Search placeholder="Search steps" />
                    <Suspense
                        fallback={
                            <Skeleton className="mt-6 h-20 w-full rounded-xl" />
                        }
                    >
                        <StepTable limit={100} query={query} />
                    </Suspense>
                </div>
                <Link href="/account/step/create" className="mt-5">
                    <Button>Create a new step</Button>
                </Link>
            </section>
        </>
    )
}
