import { Title } from '@/components/Title/Title'

import { TeamSelect } from '@/components/TeamSelect/TeamSelect'
import { getClient } from '@/graphql/client'
import { allTeamsInfoQuery } from '@/graphql/queries/teams'
import { AllTeamsInfoQuery } from '@/generated/graphql'
import { TeamPageParams } from '../types/pageProps'

export const revalidate = 3600 // revalidate at most every hour

export default async function Page({
    searchParams,
}: {
    searchParams: TeamPageParams
}) {
    const { team } = searchParams
    const client = getClient()

    const { data }: { data: AllTeamsInfoQuery } = await client.query({
        query: allTeamsInfoQuery,
    })

    if (!data.teamCollection?.items) {
        return <div> oop something went wrong </div>
    }

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <Title size="xl"> The teams </Title>
            <h2 className="mt-6 mb-8 text-4xl font-bold text-white">
                {team ? `You are in team ${team}` : 'Please select a team'}
            </h2>
            <TeamSelect teams={data?.teamCollection?.items!} />
        </section>
    )
}
