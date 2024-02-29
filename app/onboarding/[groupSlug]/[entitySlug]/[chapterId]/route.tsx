import { ChapterWithFirstStepQueryResult } from '@/generated/graphql'
import { getClient } from '@/graphql/client'
import { chapterWithFirstStepQuery } from '@/graphql/queries/entityGroups'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET(
    request: NextRequest,
    params: {
        params: {
            groupId: string
            entityId: string
            chapterId: string
        }
    }
) {
    console.log('hitting route handler ')
    const client = getClient()

    //get the chapter and then its first step

    let step = null

    const {
        data: allEntityGroupData,
    }: { data: ChapterWithFirstStepQueryResult } = await client
        .query({
            query: chapterWithFirstStepQuery,
            variables: {
                id: params.params.chapterId,
            },
        })
        .then((data) => {
            step =
                data.data?.chapter?.linkedFrom?.onboardStepCollection?.items.at(
                    0
                )?.sys?.id

            redirect(
                `/onboarding/${params.params.groupId}/${params.params.entityId}/${params.params.chapterId}/${step}`
            )
        })
}
