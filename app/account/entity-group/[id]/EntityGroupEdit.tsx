import { FunctionComponent } from 'react'
import { EntityGroupUpdateForm } from './EntityGroupUpdateForm'
import { db } from '@/lib/db'

type EntityGroupEditProps = {
    id: string
}

export const EntityGroupEdit: FunctionComponent<EntityGroupEditProps> = async ({
    id,
}) => {
    const currentData = await db.entityGroup.findFirst({
        where: {
            id,
        },
    })

    if (!currentData) return <>no group was found matching that id</>

    const { name, level, slug } = currentData

    return (
        <section className="mt-5 flex w-3/6 flex-col ">
            <EntityGroupUpdateForm
                level={level}
                name={name}
                slug={slug}
                id={id}
            />
        </section>
    )
}
