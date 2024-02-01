'use client'

import { FunctionComponent, startTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useUser } from '@clerk/clerk-react'
import { SqaureButton } from '../SqaureButton/SquareButton'
import { EntitySelectProps } from './types'

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

    const router = useRouter()

    const navigateToFirstStep = async () => {
        if (!entities || !selectedEntity || !user) return
        setLoading(true)

        try {
            startTransition(() => {
                startTransition(() =>
                    //@ts-ignore
                    createOrUpdateUser({ team: selectedEntity, id: user.id })
                )
            })
        } catch (error) {
            console.log(error)
        } finally {
            const navigationEntity = entities.find(
                (entity) => entity.id === selectedEntity
            )

            const path = `${navigationPath}/${selectedEntity}/${navigationEntity?.firstChapterId}/${navigationEntity?.firstStepId}`

            router.push(path)
        }
    }

    if (entities.length < 2 && smallButtonWhenSingleEntity)
        return (
            <button
                className="mt-9 rounded-md bg-pink-600 px-6 py-3 text-xl font-bold text-white"
                onClick={navigateToFirstStep}
            >
                {' '}
                Just click here
            </button>
        )

    return (
        <>
            <div className=" mb-12 flex justify-between ">
                {entities.map((entity) => (
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
                ))}
            </div>

            <div
                className={`${
                    selectedEntity
                        ? 'flex flex-col items-center justify-center'
                        : 'invisible'
                }`}
            >
                <p className="mt-6  text-2xl text-white"> Great choise !</p>

                <button
                    className={`mt-9 rounded-md bg-pink-600 px-6 py-3 text-xl font-bold text-white ${
                        loading ? '' : 'animate-bounce'
                    }  `}
                    onClick={navigateToFirstStep}
                    disabled={loading}
                >
                    {loading ? (
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="mr-4 animate-spin"
                        />
                    ) : null}

                    {loading ? 'loading...' : 'i am ready'}
                </button>
            </div>
        </>
    )
}
