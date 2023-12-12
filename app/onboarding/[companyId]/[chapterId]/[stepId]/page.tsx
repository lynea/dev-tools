import { CompanyStepPageParams } from '@/app/onboarding/types/pageProps'

import { Chapter } from '@/components/Chapter/Chapter'
import { CompaniesQuery } from '@/generated/graphql'
import { getClient } from '@/graphql/client'
import { companiesQuery } from '@/graphql/queries/companies'

export default async function Page({
    params,
}: {
    params: CompanyStepPageParams
}) {
    const client = getClient()

    const { data }: { data: CompaniesQuery } = await client.query({
        query: companiesQuery,
        variables: {
            id: params.companyId,
        },
    })

    //TODO: see if we can make it so that it queries for a entity programmaticly
    const chaptersForCompany = data.company?.linkedFrom?.chapterCollection

    return (
        <Chapter
            chapterCompletedLink={`/onboarding/department-select`}
            basePath={`/onboarding/${params.companyId}`}
            chapterId={params.chapterId}
            stepId={params.stepId}
            chapters={chaptersForCompany}
        />
    )
}
