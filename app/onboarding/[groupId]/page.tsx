import {
    EntityGroupSelectPageParams,
    GlobalStepPageParams,
} from '@/app/onboarding/types/pageProps'
import { EntitySelect } from '@/components/EntitySelect/EntitySelect'
import { Entities } from '@/components/EntitySelect/types'
import { Title } from '@/components/Title/Title'
import { EntityGroupQuery } from '@/generated/graphql'
import { entityGroupQuery } from '@/graphql/queries/entityGroups'
import { getClient } from '@/lib/client'

export default async function Page({
    params,
}: {
    params: EntityGroupSelectPageParams
}) {
    const client = getClient()

    const { data }: { data: EntityGroupQuery } = await client
        .query({
            query: entityGroupQuery,
            variables: {
                id: params.groupId,
            },
        })
        .catch((error) => {
            console.log(error)
            throw new Error('No entity group found')
        })

    const entityGroupDataFactory = (
        data: EntityGroupQuery
    ): { name: string; entities: Entities } | undefined => {
        const group = data.entityGroup
        console.log(
            'entitites',
            group?.linkedFrom?.entityCollection?.items[0]?.linkedFrom
                ?.chapterCollection?.items
        )
        const entities: Entities =
            group?.linkedFrom?.entityCollection?.items.map((item) => ({
                name: item?.name ?? '',
                id: item?.sys.id ?? '',
                firstChapterId:
                    item?.linkedFrom?.chapterCollection?.items.at(0)?.sys.id ??
                    '',
                firstStepId:
                    item?.linkedFrom?.chapterCollection?.items
                        .at(0)
                        ?.linkedFrom?.onboardStepCollection?.items.at(0)?.sys
                        .id ?? '',
            })) ?? []

        return {
            name: group?.name ?? '',
            entities,
        }
    }

    const formattedGroup = entityGroupDataFactory(data)

    console.log('formattedGroup', formattedGroup)

    //TODO: see if we can make it so that it queries for a entity programmaticly
    // const chaptersForDepartment = data.entityGroup?.linkedFrom?.chapterCollection

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <Title size="xl"> The {formattedGroup?.name} </Title>
            <h2 className="mt-6 mb-8 text-4xl font-bold text-white">
                For which of our {formattedGroup?.name} will you work?
            </h2>
            <EntitySelect
                entities={formattedGroup?.entities ?? []}
                navigationPath={`/onboarding/${params.groupId}`}
            />
        </section>
    )
}
