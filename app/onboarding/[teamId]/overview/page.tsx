import { currentUser } from '@clerk/nextjs/app-beta'
import type { User } from '@clerk/nextjs/api'

import { Title } from '@/components/Title/Title'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleCheck,
    faSquareArrowUpRight,
} from '@fortawesome/free-solid-svg-icons'
import {
    AllGobalChaptersInfoQuery,
    Chapter,
    TeamsQuery,
} from '@/generated/graphql'
import { allGobalChaptersInfoQuery } from '@/graphql/queries/globalChapter'
import { getClient } from '@/lib/client'
import { CompletedPageParams } from '../../types/pageProps'
import { teamsQuery } from '@/graphql/queries/teams'
import { db } from '@/lib/db'

export default async function Page({
    params,
}: {
    params: CompletedPageParams
}) {
    const user: User | null = await currentUser()

    if (!user?.id) return <>no user was found</>

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    })

    const hasCompletedAll = dbUser?.hasCompleted

    //should not allow to be here if user has not completed all steps
    //

    const client = getClient()

    const getFirstStepId = (chapter: Chapter) => {
        const sortedSteps = [
            ...(chapter?.linkedFrom?.onboardStepCollection?.items ?? []),
        ]?.sort((a, b) => a?.step! - b?.step!)

        return sortedSteps.at(0)?.sys?.id
    }

    const { data: globalChapterData }: { data: AllGobalChaptersInfoQuery } =
        await client.query({
            query: allGobalChaptersInfoQuery,
        })

    const sortedGlobalChapters = [
        ...(globalChapterData?.chapterCollection?.items ?? []),
    ]?.sort((a, b) => a?.id! - b?.id!)

    console.log('teamId', params.teamId)

    const { data: teamData }: { data: TeamsQuery } = await client.query({
        query: teamsQuery,
        variables: {
            id: params.teamId,
        },
    })

    console.log('teamData', teamData)

    const teamInfo = teamData.team

    const sortedTeamChapters = [
        ...(teamInfo?.linkedFrom?.chapterCollection?.items ?? []),
    ]?.sort((a, b) => a?.id! - b?.id!)

    return (
        <section className="flex w-full flex-col ">
            <Title>Global chapters</Title>

            <div className="mt-4  flex  flex-col items-center  ">
                <ol className="w-full space-y-4  ">
                    {sortedGlobalChapters?.map((chapter, index) => (
                        <li
                            key={chapter?.sys.id}
                            className="cursor-pointer  font-bold"
                        >
                            <Link
                                href={`/onboarding/global/${chapter?.sys.id}/${
                                    //@ts-ignore
                                    chapter ? getFirstStepId(chapter) : ''
                                }`}
                            >
                                <div
                                    className="rounded-sm  bg-pink-400 py-4 px-2 text-main-200"
                                    role="alert"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="sr-only">
                                            User info
                                        </span>
                                        <h3 className="">{`${
                                            index + 1
                                        }: ${chapter?.name}`}</h3>
                                        <FontAwesomeIcon
                                            icon={faSquareArrowUpRight}
                                            className=" h-5 text-xs  "
                                        />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ol>
            </div>
            <hr className="mt-8  h-0.5 border-t-0 bg-pink-400 opacity-100 dark:opacity-50" />
            <div className="">
                <Title>Team chapters</Title>
                <div className="mt-4  flex  flex-col items-center  ">
                    <ol className="w-full space-y-4  ">
                        {sortedTeamChapters?.map((chapter, index) => (
                            <li
                                key={chapter?.sys.id}
                                className="cursor-pointer  font-bold"
                            >
                                <Link
                                    href={`/onboarding/${
                                        params.teamId
                                    }/${chapter?.sys.id}/${
                                        //@ts-ignore
                                        chapter ? getFirstStepId(chapter) : ''
                                    }`}
                                >
                                    <div
                                        className="rounded-sm  bg-pink-400 py-4 px-2 text-main-200"
                                        role="alert"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="sr-only">
                                                User info
                                            </span>
                                            <h3 className="">{`${
                                                index + 1
                                            }: ${chapter?.name}`}</h3>
                                            <FontAwesomeIcon
                                                icon={faSquareArrowUpRight}
                                                className=" h-5 text-xs  "
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}
