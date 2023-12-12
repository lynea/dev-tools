import { Title } from '@/components/Title/Title'
import { getClient } from '@/graphql/client'
import { AllDepartmentsQuery } from '@/generated/graphql'
import { TeamPageParams } from '../types/pageProps'

import { allDepartmentsQuery } from '@/graphql/queries/departments'
import { Entities } from '@/components/EntitySelect/types'
import { EntitySelect } from '@/components/EntitySelect/EntitySelect'

export const revalidate = 3600 // revalidate at most every hour

export default async function Page({
    searchParams,
}: {
    searchParams: TeamPageParams
}) {
    const client = getClient()

    const { data }: { data: AllDepartmentsQuery } = await client.query({
        query: allDepartmentsQuery,
    })

    if (!data.departmentCollection?.items) {
        console.error('No companies found')
        return <div> oop something went wrong </div>
    }

    const companies: Entities = data.departmentCollection.items.map(
        (department) => {
            const firstChapter =
                department?.linkedFrom?.chapterCollection?.items?.[0]

            const sortedSteps = [
                ...(firstChapter?.linkedFrom?.onboardStepCollection?.items ??
                    []),
            ]?.sort((a, b) => a?.step! - b?.step!)

            const firstStepId = sortedSteps.at(0)?.sys?.id

            return {
                firstStepId: firstStepId ?? '',
                firstChapterId: firstChapter?.sys?.id ?? '',
                id: department?.sys?.id ?? '',
                name: department?.name ?? '',
            }
        }
    )

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <Title size="xl"> The departments </Title>
            <h2 className="mt-6 mb-8 text-4xl font-bold text-white">
                Please select a department
            </h2>
            <EntitySelect
                entities={companies}
                navigationPath={`/onboarding/department`}
            />
        </section>
    )
}
