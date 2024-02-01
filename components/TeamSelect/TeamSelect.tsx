'use client'

import { FunctionComponent, startTransition, useState } from 'react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { createOrUpdateUser } from '../../app/actions'
import { useUser } from '@clerk/clerk-react'
import { SqaureButton } from '../SqaureButton/SquareButton'
import { TeamSelectProps } from './types'

export const TeamSelect: FunctionComponent<TeamSelectProps> = ({ teams }) => {
    const [selectedTeam, setSelectedTeam] = useState<string | undefined>(
        undefined
    )
    const { user } = useUser()

    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    const getChaptersForTeam = (id: string) => {
        // get chapters for team
        const team = teams?.find((team) => team?.sys.id === id)
        const chapters = team?.linkedFrom?.chapterCollection?.items
        return chapters
    }

    const navigateToFirstStep = async () => {
        //first save the user to the db
        //get the first step of the first chapter of the selected team
        if (!teams || !selectedTeam || !user) return
        setLoading(true)

        try {
            startTransition(() =>
                //@ts-ignore
                createOrUpdateUser({ team: selectedTeam, id: user.id })
            )
        } catch (error) {
            console.log(error)
        } finally {
            const sortedChapters = [
                ...(getChaptersForTeam(selectedTeam) ?? []),
            ]?.sort((a, b) => a?.id! - b?.id!)

            if (sortedChapters.length < 1) {
                return
            }

            const firstChapter = sortedChapters.at(0)

            if (!firstChapter?.sys.id) return

            //TODO: sorting is duplicated should move to util
            const sortedSteps = [
                ...(firstChapter?.linkedFrom?.onboardStepCollection?.items ??
                    []),
            ]?.sort((a, b) => a?.step! - b?.step!)

            const firstStep = sortedSteps.at(0)?.sys?.id
            router.push(
                `/onboarding/${selectedTeam}/${firstChapter?.sys?.id}/${firstStep}`
            )
        }
    }

    return (
        <>
            <div className=" mb-12 flex justify-between ">
                {teams.map((team) => (
                    <SqaureButton
                        disabled={
                            getChaptersForTeam(team?.sys?.id!)?.length === 0
                        }
                        key={team?.alias}
                        active={selectedTeam === team?.sys?.id}
                        onClick={() => {
                            setLoading(false)

                            setSelectedTeam(team?.sys?.id ?? undefined)
                        }}
                        className="border-pink mr-8 h-40 w-40 rounded-md border-2 text-3xl font-bold text-white"
                    >
                        <h3> {team?.alias}</h3>
                        <p className="mt-4 text-sm">({team?.name})</p>
                    </SqaureButton>
                ))}
            </div>

            <div
                className={`${
                    selectedTeam
                        ? 'flex flex-col items-center justify-center'
                        : 'invisible'
                }`}
            >
                <p className="mt-6  text-2xl text-white">
                    {' '}
                    Great choise ! now lets learn more about your team
                </p>

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
