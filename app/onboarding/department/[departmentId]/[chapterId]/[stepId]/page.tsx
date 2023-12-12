import { DepartmentStepPageParams } from '@/app/onboarding/types/pageProps'

import { Chapter } from '@/components/Chapter/Chapter'
import { DepartmentQuery } from '@/generated/graphql'
import { getClient } from '@/graphql/client'
import { departmentQuery } from '@/graphql/queries/departments'

export default async function Page({
    params,
}: {
    params: DepartmentStepPageParams
}) {
    const client = getClient()

    const { data }: { data: DepartmentQuery } = await client.query({
        query: departmentQuery,
        variables: {
            id: params.departmentId,
        },
    })

    const chaptersForDepartment = data.department?.linkedFrom?.chapterCollection

    return (
        <Chapter
            chapterCompletedLink="/onboarding/team-select"
            basePath={`/onboarding/department/${params.departmentId}`}
            chapterId={params.chapterId}
            stepId={params.stepId}
            chapters={chaptersForDepartment}
        />
    )
}
