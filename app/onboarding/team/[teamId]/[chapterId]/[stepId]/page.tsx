import { TeamsStepPageParams } from '@/app/onboarding/types/pageProps'

import { Chapter } from '@/components/Chapter/Chapter'
import { TeamsQuery } from '@/generated/graphql'
import { getClient } from '@/graphql/client'
import { teamsQuery } from '@/graphql/queries/teams'

export default async function Page({
    params,
}: {
    params: TeamsStepPageParams
}) {
    const client = getClient()

    const { data }: { data: TeamsQuery } = await client.query({
        query: teamsQuery,
        variables: {
            id: params.teamId,
        },
    })

    const chaptersForTeams = data.team?.linkedFrom?.chapterCollection

    return (
        <Chapter
            chapterCompletedLink={`/onboarding/team/${params.teamId}/completed`}
            basePath={`/onboarding/team/${params.teamId}`}
            chapterId={params.chapterId}
            stepId={params.stepId}
            chapters={chaptersForTeams}
        />
    )
}
