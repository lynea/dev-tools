import { FunctionComponent } from 'react'
import { Box } from '../Box/Box'
import { getScoreDifference } from './helpers/scores'

type Score = {
    name: string
    value: number
}

type GraphProps = {
    scoreRuns: Score[][]
}

//ScoreRuns [scorerun]
// ScoreRun []

export const Graph: FunctionComponent<GraphProps> = ({ scoreRuns }) => {
    if (scoreRuns.length > 2) {
        console.warn('only 2 score runs can be shown at the same time ')
    }

    const firstScores = scoreRuns.at(0)
    const secondScores = scoreRuns.at(1)

    return (
        <Box>
            {!firstScores?.length ? (
                <div className="flex h-80 w-full items-center justify-center">
                    <h2> no scores to show </h2>
                </div>
            ) : (
                <div className=" grid h-80  w-full grid-flow-dense grid-rows-6 items-end gap-2 ">
                    {firstScores?.map((score, index) => (
                        <>
                            <p
                                className={`row-start-6 col-start-${
                                    index + 1
                                } text-center font-bold`}
                            >
                                {`${score.name} ${
                                    secondScores?.at(index)?.value &&
                                    secondScores?.length
                                        ? getScoreDifference(
                                              score.value,
                                              secondScores?.at(index)?.value!!
                                          )
                                        : ''
                                }`}
                            </p>
                            {score.value ? (
                                <>
                                    <div className=" row-span-5 row-start-1 flex h-full items-end justify-center">
                                        {secondScores?.length ? (
                                            <div
                                                style={{
                                                    height: `${secondScores?.at(
                                                        index
                                                    )?.value}%`,
                                                }}
                                                className=" mr-3 flex flex-col items-center overflow-hidden transition-all duration-1000 ease-in-out"
                                            >
                                                <div
                                                    className={` flex h-full   w-fit items-center justify-center rounded-sm bg-gradient-to-t from-gradientEnd to-gradientStart p-4 font-bold `}
                                                >
                                                    <p className="text-5xl">
                                                        {secondScores?.at(index)
                                                            ?.value ?? 0}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : null}
                                        <div
                                            style={{
                                                height: score.value
                                                    ? `${score.value}%`
                                                    : '0',
                                            }}
                                            className=" transition-height flex flex-col items-center duration-1000 ease-in-out"
                                        >
                                            <div
                                                className={` flex h-full   w-fit items-center justify-center rounded-sm bg-gradient-to-t p-4 font-bold ${
                                                    secondScores?.length &&
                                                    score.value -
                                                        secondScores?.at(index)
                                                            ?.value!! >
                                                        0
                                                        ? 'from-gradientGreenStart to-gradientGreenEnd'
                                                        : 'from-gradientEnd to-gradientStart'
                                                }`}
                                            >
                                                <p className="text-5xl">
                                                    {score?.value ?? 0}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : null}
                        </>
                    ))}
                </div>
            )}
        </Box>
    )
}
