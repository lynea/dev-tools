import { CompanyStepPageParams } from '@/app/onboarding/types/pageProps'

import { Chapter } from '@/components/Chapter/Chapter'
import { AllEntityGroupQuery, EntityInfoQuery } from '@/generated/graphql'
import { getClient } from '@/graphql/client'

export const dynamic = 'force-dynamic'

import {
    allEntityGroupQuery,
    entityInfoQuery,
} from '@/graphql/queries/entityGroups'

export default async function Page({
    params,
}: {
    params: CompanyStepPageParams
}) {
    const client = getClient()

    const { data: allEntityGroupData }: { data: AllEntityGroupQuery } =
        await client.query({
            query: allEntityGroupQuery,
            variables: {
                id: params.entityId,
            },
        })

    const { data }: { data: EntityInfoQuery } = await client.query({
        query: entityInfoQuery,
        variables: {
            id: params.entityId,
        },
    })

    const nextEntityGroup =
        allEntityGroupData?.entityGroupCollection?.items.at(0)

    const getCompletedLink = () => {
        if (!nextEntityGroup) {
            return `/onboarding/${params.groupId}/${params.entityId}/${params.chapterId}/${params.stepId}/completed`
        }

        return `/onboarding/${nextEntityGroup?.sys.id}`
    }

    const chaptersForEntity = data?.entity?.linkedFrom?.chapterCollection

    if (!chaptersForEntity) return <>no chapters found</>

    return (
        <Chapter
            chapterCompletedLink={getCompletedLink()}
            basePath={`/onboarding/${params.groupId}/${params.entityId}`}
            chapterId={params.chapterId}
            stepId={params.stepId}
            // @ts-ignore
            chapters={chaptersForEntity!}
        />
    )
}
