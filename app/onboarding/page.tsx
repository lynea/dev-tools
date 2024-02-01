import { Title } from '@/components/Title/Title'
import { currentUser } from '@clerk/nextjs/app-beta'
import type { User } from '@clerk/nextjs/api'
import { FirstGroupWithEntityQuery } from '@/generated/graphql'

import { getClient } from '@/lib/client'
import { TSGScene } from '@/components/TsgScene/TsgScene'
import { EntitySelect } from '@/components/EntitySelect/EntitySelect'
import { Entities } from '@/components/EntitySelect/types'
import { firstGroupWithEntity } from '@/graphql/queries/entityGroups'
import { startTransition } from 'react'
import { Toast } from '@/components/Toast/Toast'

// nice to have is a pre assignment for a user to guide them trough the correct path
// todo make user specific when backend is ready
// we get the entity groups with the lowest level from the cms
// if there is only one entity in the group we render a button that links to the entity
// if there are more entities in the group a selection component is rendered to select the correct entity
// user gets navigated to the first step of the first chapter of the selected entity

export default async function Page() {
    const client = getClient()

    const { data: firstGroupData }: { data: FirstGroupWithEntityQuery } =
        await client.query({
            query: firstGroupWithEntity,
        })

    const firstGroupDataFactory = (
        data: FirstGroupWithEntityQuery
    ): { name: string; id: string; entities: Entities } | undefined => {
        const group = data.entityGroupCollection?.items.at(0)

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
            id: group?.sys.id ?? '',
            name: group?.name ?? '',
            entities,
        }
    }

    const firstGroup = firstGroupDataFactory(firstGroupData)

    console.log('firstGroup', firstGroup)
    console.log('entities', firstGroup?.entities)

    // const getFirstStep = async () => {F
    //     //get the first step of the first chapter of the selected team

    //     if (!data.chapterCollection?.items) return

    //     const sortedChapters = [
    //         ...(data?.chapterCollection?.items ?? []),
    //     ]?.sort((a, b) => a?.id! - b?.id!)

    //     if (sortedChapters.length < 1) {
    //         return
    //     }

    //     const firstChapter = sortedChapters.at(0)

    //     if (!firstChapter?.sys.id) {
    //         console.error('no sys id')
    //         return
    //     }

    //     //TODO: sorting is duplicated should move to util
    //     const sortedSteps = [
    //         ...(firstChapter?.linkedFrom?.onboardStepCollection?.items ?? []),
    //     ]?.sort((a, b) => a?.step! - b?.step!)

    //     const firstStep = sortedSteps.at(0)?.sys?.id

    //     return `/onboarding/global/${firstChapter?.sys?.id}/${firstStep}`
    // }

    const user: User | null = await currentUser()

    // create a user if there is none

    if (!firstGroup?.entities?.length) return <div>loading</div>

    return (
        <section className="flex w-full flex-col items-center justify-center ">
            <Toast />

            <Title size="xl"> My onboarding </Title>
            <h2 className="mt-6 mb-2 text-4xl font-bold text-white">
                {' '}
                Welcome {user?.firstName}!{' '}
            </h2>
            <h2 className="text-3xl font-bold text-white">
                {`And congrats on your first day at Mijndomein`}
            </h2>

            <div className="mb-12 h-96">
                <TSGScene />
            </div>
            <p className="mt-20  text-2xl text-white">
                {' '}
                We will get you up to speed in no time{' '}
            </p>

            <EntitySelect
                smallButtonWhenSingleEntity
                entities={firstGroup.entities}
                navigationPath={`/onboarding/${firstGroup.id}`}
            />
        </section>
    )
}
