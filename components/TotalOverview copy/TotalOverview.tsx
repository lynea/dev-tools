'use client'

import { getTeamNamesForTotal, getTotalScoresForTeams } from '@/utils/allTeams'
import {
    _getGoogleSheetClient,
    _readGoogleSheet,
    _readGoogleSpreadsheet,
} from '@/utils/requests/sheets'
import { FunctionComponent, useState } from 'react'
import { Box } from '../Box/Box'
import { useLottie } from 'lottie-react'
import confetti from '../../public/confetti.json'
import { Graph } from '../Graph/Graph'

type ScoreResult = {
    name: string
    data: any[][] | null | undefined
}[]

type Score = {
    name: string
    score: number
}

type Scores = Array<Score>

type TotalOverviewProps = {
    scoreResult: ScoreResult
}

const getScoreDifference = (currentScore: number, previousScore: number) => {
    const difference = currentScore - previousScore

    if (difference <= 0) return difference.toString()

    return `+ ${difference}`
}

const Animation = () => {
    const animationOptions = {
        animationData: confetti,
        loop: false,
    }

    const { View } = useLottie(animationOptions)

    return <>{View}</>
}

export const TotalOverview: FunctionComponent<TotalOverviewProps> = ({
    scoreResult,
}) => {
    const [lastResults, secondLastResults] = scoreResult
    //@ts-ignore
    const teamNames: string[] = lastResults.data
        ? getTeamNamesForTotal(lastResults?.data ?? []).filter(
              (teamName) => teamName !== undefined
          )
        : []

    //state
    const [shouldCompare, setShouldCompare] = useState(false)
    const [selectedTeams, setSelectedTeams] = useState<string[]>(teamNames)

    const lastScores = lastResults
        ? getTotalScoresForTeams(lastResults?.data ?? [], selectedTeams)
        : []

    const secondLastScores = secondLastResults
        ? getTotalScoresForTeams(secondLastResults?.data ?? [], selectedTeams)
        : []

    const handleTeamFilter = (teamName: string) => {
        if (!teamName) return
        if (selectedTeams.includes(teamName)) {
            const dub = [...selectedTeams]

            const removed = dub.filter((item) => item !== teamName)
            setSelectedTeams([...removed])
        } else {
            setSelectedTeams([...selectedTeams, teamName])
        }
    }

    const isPartyTime = lastScores?.some((score) => score.value === 100)

    return (
        <div>
            <h2 className="mb-5 text-2xl font-bold text-white opacity-70">
                {lastResults.name}{' '}
                {secondLastResults ? `vs ${secondLastResults.name}` : ''}
            </h2>
            {secondLastResults && (
                <>
                    <input
                        type="checkbox"
                        id="compare"
                        className="mb-5"
                        onChange={() => setShouldCompare(!shouldCompare)}
                    />
                    <label className="text-white" htmlFor="compare">
                        {' '}
                        compare to previous run
                    </label>{' '}
                </>
            )}

            {isPartyTime ? (
                <div className="absolute top-0 ">
                    <Animation />
                </div>
            ) : null}
            <Graph scoreRuns={[lastScores, secondLastScores]} />
            <div className="mt-6 flex w-full flex-col items-center ">
                <p className="text-white"> filter by team</p>
                <div className="mt-2 flex justify-center ">
                    {teamNames.length &&
                        teamNames?.map((teamName, index) => (
                            <button
                                key={teamName + index}
                                className={`mr-5  rounded-sm px-2 py-1 font-bold ${
                                    teamName && selectedTeams.includes(teamName)
                                        ? 'bg-pink text-white'
                                        : 'bg-white text-purple-200'
                                } `}
                                onClick={() => handleTeamFilter(teamName!!)}
                            >
                                {teamName}
                            </button>
                        ))}
                </div>
            </div>
        </div>
    )
}
