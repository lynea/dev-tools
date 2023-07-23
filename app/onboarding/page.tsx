import { DonutScene } from '@/components/DonutScene/DonutScene'
import { Title } from '@/components/Title/Title'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/app-beta'
import type { User } from '@clerk/nextjs/api'
import { AllGobalChaptersInfoQuery } from '@/generated/graphql'
import { allGobalChaptersInfoQuery } from '@/graphql/queries/globalChapter'
import { getClient } from '@/lib/client'

export default async function Page({
    searchParams,
}: {
    searchParams: { team: string }
}) {
    const client = getClient()

    const { data }: { data: AllGobalChaptersInfoQuery } = await client.query({
        query: allGobalChaptersInfoQuery,
    })

    console.log(data.chapterCollection?.items)

    const getFirstStep = async () => {
        //get the first step of the first chapter of the selected team
        // setLoading(true);
        if (!data.chapterCollection?.items) return

        const sortedChapters = [
            ...(data?.chapterCollection?.items ?? []),
        ]?.sort((a, b) => a?.id! - b?.id!)

        if (sortedChapters.length < 1) {
            return
        }

        const firstChapter = sortedChapters.at(0)

        if (!firstChapter?.sys.id) {
            console.error('no sys id')
            return
        }

        //TODO: sorting is duplicated should move to util
        const sortedSteps = [
            ...(firstChapter?.linkedFrom?.onboardStepCollection?.items ?? []),
        ]?.sort((a, b) => a?.step! - b?.step!)

        const firstStep = sortedSteps.at(0)?.sys?.id

        return `/onboarding/global/${firstChapter?.sys?.id}/${firstStep}`
    }

    const user: User | null = await currentUser()

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <div className="absolute top-11">
                <div
                    className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                >
                    <span className="font-bold">
                        This project is currently in alfa if you encounter any
                        problems please report them to Rene van Dijk or your
                        team lead{' '}
                    </span>
                </div>
            </div>

            <Title size="xl"> My onboarding </Title>
            <h2 className="mt-6 mb-2 text-4xl font-bold text-white">
                {' '}
                Welcome {user?.firstName}!{' '}
            </h2>
            <h2 className="text-3xl font-bold text-white">
                {' '}
                And congrats on your first day at Mijndomein{' '}
            </h2>

            <div className="mb-12 h-96">
                <DonutScene />
            </div>
            <p className="mt-6  text-2xl text-white">
                {' '}
                We will get you ready to write some awesome code in no time{' '}
            </p>
            <Link href={(await getFirstStep()) || ''}>
                <button className="mt-9 rounded-md bg-pink-600 px-6 py-3 text-xl font-bold text-white">
                    {' '}
                    Just click here
                </button>
            </Link>
        </section>
    )
}
