'use client'

import { FunctionComponent, useState } from 'react'

import { useUser } from '@clerk/clerk-react'
import { SqaureButton } from '../SqaureButton/SquareButton'
import { EntitySelectProps } from './types'
import Link from 'next/link'

export const EntitySelect: FunctionComponent<EntitySelectProps> = ({
    entities,
    navigationPath,
    smallButtonWhenSingleEntity = false,
}) => {
    const [selectedEntity, setSelectedEntity] = useState<string | undefined>(
        entities.length === 1 && smallButtonWhenSingleEntity
            ? entities.at(0)?.id
            : undefined
    )
    const { user } = useUser()

    const [loading, setLoading] = useState<boolean>(false)

    const navigationEntity = entities.find(
        (entity) => entity.id === selectedEntity
    )

    const path = `${navigationPath}/${selectedEntity}/${navigationEntity?.firstChapterId}/${navigationEntity?.firstStepId}`

    if (navigationEntity && entities?.length < 2 && smallButtonWhenSingleEntity)
        return (
            <Link href={path}>
                <button className="mt-9 rounded-md bg-pink px-6 py-3 text-xl font-bold text-white">
                    {' '}
                    Just click here
                </button>
            </Link>
        )

    return (
        <>
            <div className=" mb-12 flex justify-between ">
                {entities.map((entity) => {
                    return (
                        <SqaureButton
                            disabled={!entity.firstStepId}
                            key={entity?.id}
                            active={selectedEntity === entity.id}
                            onClick={() => {
                                setLoading(false)

                                setSelectedEntity(entity.id)
                            }}
                            className={entities.length > 1 ? 'mr-8' : ''}
                        >
                            <h3> {entity?.name}</h3>
                        </SqaureButton>
                    )
                })}
            </div>

            <div
                className={`${
                    selectedEntity
                        ? 'flex flex-col items-center justify-center'
                        : 'invisible'
                }`}
            >
                <p className="mt-6  text-2xl text-foreground">
                    {' '}
                    Great choise !
                </p>

                <Link href={path}>
                    <button
                        className={`mt-9 rounded-md bg-pink px-6 py-3 text-xl font-bold text-white ${
                            loading ? '' : 'animate-bounce'
                        }  `}
                    >
                        i am ready
                    </button>
                </Link>
            </div>
        </>
    )
}
