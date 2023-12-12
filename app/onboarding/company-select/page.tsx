import { Title } from '@/components/Title/Title'
import { getClient } from '@/graphql/client'
import { AllCompaniesQuery } from '@/generated/graphql'
import { TeamPageParams } from '../types/pageProps'

import { allCompaniesQuery } from '@/graphql/queries/companies'

import { Entities } from '@/components/EntitySelect/types'
import { EntitySelect } from '@/components/EntitySelect/EntitySelect'

export const revalidate = 3600 // revalidate at most every hour

export default async function Page({
    searchParams,
}: {
    searchParams: TeamPageParams
}) {
    const client = getClient()

    const { data }: { data: AllCompaniesQuery } = await client.query({
        query: allCompaniesQuery,
    })

    if (!data.companyCollection?.items) {
        console.error('No companies found')
        return <div> oop something went wrong </div>
    }

    const companies: Entities = data.companyCollection.items.map((company) => {
        const firstChapter = company?.linkedFrom?.chapterCollection?.items?.[0]

        const sortedSteps = [
            ...(firstChapter?.linkedFrom?.onboardStepCollection?.items ?? []),
        ]?.sort((a, b) => a?.step! - b?.step!)

        const firstStepId = sortedSteps.at(0)?.sys?.id

        return {
            firstStepId: firstStepId ?? '',
            firstChapterId: firstChapter?.sys?.id ?? '',
            id: company?.sys?.id ?? '',
            name: company?.name ?? '',
        }
    })

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <Title size="xl"> The Companies </Title>
            <h2 className="mt-6 mb-8 text-4xl font-bold text-white">
                Please select a company
            </h2>
            <EntitySelect entities={companies} navigationPath={`/onboarding`} />
        </section>
    )
}
