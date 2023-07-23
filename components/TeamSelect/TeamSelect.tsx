'use client'

import { FunctionComponent, useState } from 'react'
import { clsx } from 'clsx'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

type SquareButtonProps = {
    children: React.ReactNode
    className?: string
    active?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>

export const SqaureButton: FunctionComponent<SquareButtonProps> = ({
    children,
    onClick,
    disabled,
    active,
    ...otherProps
}) => {
    return (
        <button
            {...otherProps}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                'mr-8 h-40  w-40 rounded-md  border-2 text-3xl font-bold transition-all duration-200 ease-in',
                {
                    'bg-gradient-to-t from-gradientEnd to-gradientStart text-main-200 ':
                        active && !disabled,
                    'border-pink text-white': !active && !disabled,
                    'cursor-not-allowed border-gray-500 text-gray-500':
                        disabled,
                }
            )}
        >
            {children}
        </button>
    )
}

type TeamSelectProps = {
    teams: Array<{
        __typename?: 'Team'
        name?: string | null
        alias?: string | null
        sys: { __typename?: 'Sys'; id: string }
        linkedFrom?: {
            __typename?: 'TeamLinkingCollections'
            chapterCollection?: {
                __typename?: 'ChapterCollection'
                items: Array<{
                    __typename?: 'Chapter'
                    id?: number | null
                    sys: { __typename?: 'Sys'; id: string }
                    linkedFrom?: {
                        __typename?: 'ChapterLinkingCollections'
                        onboardStepCollection?: {
                            __typename?: 'OnboardStepCollection'
                            items: Array<{
                                __typename?: 'OnboardStep'
                                step?: number | null
                                sys: { __typename?: 'Sys'; id: string }
                            } | null>
                        } | null
                    } | null
                } | null>
            } | null
        } | null
    } | null>
}

//get chapters where the teamid is the same as the selected team
// get the first step of the first chapter

export const TeamSelect: FunctionComponent<TeamSelectProps> = ({ teams }) => {
    const [selectedTeam, setSelectedTeam] = useState<string | undefined>(
        undefined
    )
    const [loading, setLoading] = useState<boolean>(false)

    const router = useRouter()

    const getChaptersForTeam = (id: string) => {
        // get chapters for team
        const team = teams?.find((team) => team?.sys.id === id)
        const chapters = team?.linkedFrom?.chapterCollection?.items
        return chapters
    }

    const navigateToFirstStep = async () => {
        //get the first step of the first chapter of the selected team
        setLoading(true)
        if (!teams || !selectedTeam) return

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
            ...(firstChapter?.linkedFrom?.onboardStepCollection?.items ?? []),
        ]?.sort((a, b) => a?.step! - b?.step!)

        const firstStep = sortedSteps.at(0)?.sys?.id
        router.push(
            `/onboarding/${selectedTeam}/${firstChapter?.sys?.id}/${firstStep}`
        )
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
