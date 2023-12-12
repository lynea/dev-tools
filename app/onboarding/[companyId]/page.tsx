import { GlobalStepPageParams } from '@/app/onboarding/types/pageProps'
import { Chapter } from '@/components/Chapter/Chapter'
import { CompaniesQuery } from '@/generated/graphql'
import { companiesQuery } from '@/graphql/queries/companies'
import { getClient } from '@/lib/client'

export default async function Page({
    params,
}: {
    params: GlobalStepPageParams
}) {
    const client = getClient()

    const { data }: { data: CompaniesQuery } = await client.query({
        query: companiesQuery,
    })

    //TODO: see if we can make it so that it queries for a entity programmaticly
    const chaptersForDepartment = data.company?.linkedFrom?.chapterCollection

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
