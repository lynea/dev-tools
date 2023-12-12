import { GlobalStepPageParams } from '@/app/onboarding/types/pageProps'
import { Chapter } from '@/components/Chapter/Chapter'
import { AllGobalChaptersInfoQuery } from '@/generated/graphql'
import { allGobalChaptersInfoQuery } from '@/graphql/queries/globalChapter'
import { getClient } from '@/lib/client'

export default async function Page({
    params,
}: {
    params: GlobalStepPageParams
}) {
    const client = getClient()

    const { data }: { data: AllGobalChaptersInfoQuery } = await client.query({
        query: allGobalChaptersInfoQuery,
    })

    //TODO: see if we can make it so that it queries for a entity programmaticly
    const chaptersForDepartment = data.chapterCollection

    console.log(
        chaptersForDepartment?.items[0]?.linkedFrom?.onboardStepCollection
            ?.items
    )

    return (
        <Chapter
            chapterCompletedLink={'/onboarding/company-select'}
            basePath={`/onboarding/global`}
            chapterId={params.chapterId}
            stepId={params.stepId}
            chapters={chaptersForDepartment}
        />
    )
}
