import { getClient } from '@/graphql/client'
import {
    incrementChapter,
    incrementStep,
    decrementChapter,
    decrementStep,
} from '@/utils/todo'
import { currentUser } from '@clerk/nextjs'
import { faCircleCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Step, Chapter as IChapter, User, Todo } from '@prisma/client'
import clsx from 'clsx'
import { headers } from 'next/headers'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Box } from '../Box/Box'
import { ImageViewer } from '../ImageViewer/ImageViewer'
import { StepButton } from '../StepButton/StepButton'
import { Title } from '../Title/Title'
import { TodoWrapper } from '../TodoWrapper/TodoWrapper'

import { Player } from '../Video/Player'
import { ChapterProps } from './types'
import { BackButton } from '../StepBackButton/BackButton'
import { Progress } from 'flowbite-react'
import { db } from '@/lib/db'

const getFirstStepId = (chapter: IChapter & { steps: Step[] }) => {
    const sortedSteps = [...chapter.steps]

    return sortedSteps?.at(0)?.id
}

export const Chapter = async ({
    chapterId,
    stepId,
    chapters,
    basePath,
    chapterCompletedLink,
}: ChapterProps) => {
    const user: User | null = await currentUser()

    const host = headers().get('host')
    if (!user) return <>no user was found</>

    const allTodos = await db.todo.findMany({
        where: {
            stepId: stepId,
        },
    })

    const completedTodos = await db.todo.findMany({
        where: {
            stepId: stepId,
            userTodos: {
                some: {
                    userId: user.id,
                    isCompleted: true,
                },
            },
        },
    })

    const renderTodos: Array<Todo & { completed: boolean }> = allTodos.map(
        (todo) => {
            return {
                ...todo,
                completed: completedTodos.some(
                    (completedTodo) => completedTodo.id === todo.id
                ),
            }
        }
    )

    //TODO: fix:
    const hasCompletedAll = false

    const client = getClient()

    const totalChapters = chapters.length ?? 0

    const indexOfCurrentChapter = chapters.findIndex(
        (chapter) => chapter.id === chapterId
    )

    if (indexOfCurrentChapter < 0)
        return <>no chapter was found matching this id</>

    const chapterInfo = chapters.at(indexOfCurrentChapter)

    //TODO: would be nicer to find the index of the current one and then slice the next and the prev ones out;
    // and then do [prev, current, next] = sliced

    const previousChapterInfo = chapters.at(indexOfCurrentChapter - 1)

    const nextChapterInfo = chapters.at(indexOfCurrentChapter + 1)

    const stepsForChapter = chapterInfo?.steps

    const totalSteps = chapterInfo?.steps.length ?? 0

    const sortedSteps = [...(stepsForChapter ?? [])]?.sort(
        (a, b) => a?.order! - b?.order!
    )

    //get the index of the current step
    const indexOfCurrentStep = sortedSteps?.findIndex(
        (step) => step?.id === stepId
    )

    console.log('indexOfCurrentStep: ', indexOfCurrentStep)

    if (indexOfCurrentStep! < 0) return <>no step was found matching this id</>

    const currentStepInfo = sortedSteps?.at(indexOfCurrentStep!)

    const isLastChapter = indexOfCurrentChapter + 1 === totalChapters

    const canDecrementStep = true
    // indexOfCurrentStep !== 0 && indexOfCurrentChapter !== 0

    const isLastStepInChapter = indexOfCurrentStep! + 1 === totalSteps
    const isfirstStepInChapter = indexOfCurrentStep === 0

    //should accept a item array
    // and the path to route to when no more items are left
    // and the index of the current step
    const generateNextLink = (): string => {
        if (isLastStepInChapter) {
            if (isLastChapter) {
                console.log('last chapter', chapterCompletedLink)
                return chapterCompletedLink
            }

            const firstStepId = nextChapterInfo?.steps?.at(0)?.id

            const id = nextChapterInfo?.id

            if (!id || !firstStepId)
                throw new Error('could not generate next link')

            return incrementChapter(basePath, {
                id,
                firstStepId,
            })
        }

        return incrementStep(
            basePath,
            chapterId,
            sortedSteps?.at(indexOfCurrentStep! + 1)?.id!
        )
    }

    const generatePreviousLink = (): string => {
        if (isfirstStepInChapter) {
            const stepsofPreviousChapter = previousChapterInfo?.steps

            const lastStepOfPreviousChapter = stepsofPreviousChapter?.at(0)

            if (!lastStepOfPreviousChapter)
                throw new Error('could not generate previous link')

            return decrementChapter(
                basePath,
                previousChapterInfo?.id!,
                lastStepOfPreviousChapter.id
            )
        }

        return decrementStep(
            basePath,
            chapterId,
            sortedSteps?.at(indexOfCurrentStep! - 1)?.id!
        )
    }

    if (!currentStepInfo)
        return <h2> oops it looks like that step does not exist </h2>

    return (
        <>
            <section className="mt-6 flex w-full">
                <div className="w-full whitespace-pre-line [&>_div]:mt-4">
                    {/* {todoData.onboardStep?.mainImage?.url ? (
                        <ImageViewer
                            url={todoData.onboardStep?.mainImage?.url}
                        />
                    ) : null} */}

                    {currentStepInfo?.videoUrl ? (
                        <Player youtubeId={currentStepInfo.videoUrl!}></Player>
                    ) : null}

                    {currentStepInfo?.title ||
                    //  currentStepInfo?.codeBlock
                    currentStepInfo?.description ? (
                        <Box>
                            <Title>{currentStepInfo?.title}</Title>

                            <ReactMarkdown>
                                {currentStepInfo.description ?? ''}
                            </ReactMarkdown>
                        </Box>
                    ) : null}

                    {renderTodos?.length > 0 ? (
                        <Box>
                            <h3 className="mb-4 text-2xl font-bold">Todo:</h3>
                            <div
                                className="flex flex-col"
                                data-testid="body-todos"
                            >
                                <TodoWrapper
                                    todos={renderTodos}
                                    withLink={false}
                                />
                            </div>
                        </Box>
                    ) : null}

                    <div className="mt-8 flex flex-col items-center justify-center gap-10 lg:flex-row">
                        {canDecrementStep ? <BackButton /> : null}

                        <div className="order-2 flex w-full flex-col">
                            <p className="mb-1 justify-between text-center  text-lg text-white ">
                                Step{' '}
                                <span className="font-bold">
                                    {indexOfCurrentStep! + 1}
                                </span>{' '}
                                of{' '}
                                <span className="font-bold"> {totalSteps}</span>
                            </p>
                            <Progress
                                progress={
                                    ((indexOfCurrentStep! + 1) / totalSteps) *
                                    100
                                }
                                color="pink"
                            />
                        </div>

                        <StepButton
                            route={generateNextLink()}
                            todosToBeAdded={renderTodos}
                        />
                    </div>
                </div>

                <div className="mt-4 ml-6 flex  flex-col items-center ">
                    <ol className="w-72 space-y-4 ">
                        {chapters?.map((chapter, index) => (
                            <li key={chapter?.id} className="cursor-pointer">
                                <Link
                                    className={
                                        index < indexOfCurrentChapter ||
                                        hasCompletedAll
                                            ? ''
                                            : 'pointer-events-none '
                                    }
                                    href={`${basePath}/${chapter?.id}/${
                                        chapter ? getFirstStepId(chapter) : ''
                                    }`}
                                >
                                    <div
                                        className={clsx(
                                            'w-full rounded-lg  border border-white p-4  ',
                                            {
                                                'bg-gray-100 text-main-200  ':
                                                    index >
                                                        indexOfCurrentChapter &&
                                                    !hasCompletedAll,
                                                'bg-pink-400  text-main-200 ':
                                                    index <
                                                        indexOfCurrentChapter ||
                                                    hasCompletedAll,
                                                'border-pink-500 bg-purple-200 font-bold text-purple-700 ':
                                                    index ===
                                                    indexOfCurrentChapter,
                                            }
                                        )}
                                        role="alert"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="sr-only">
                                                User info
                                            </span>
                                            <h3 className="">{`${
                                                index + 1
                                            }: ${chapter?.title}`}</h3>
                                            {index < indexOfCurrentChapter ||
                                            hasCompletedAll ? (
                                                <FontAwesomeIcon
                                                    icon={faCircleCheck}
                                                    className=" h-5 text-xs  "
                                                />
                                            ) : null}
                                            {index === indexOfCurrentChapter &&
                                            !hasCompletedAll ? (
                                                <FontAwesomeIcon
                                                    icon={faArrowLeft}
                                                    className=" h-5 text-xs  "
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ol>
                </div>
            </section>
        </>
    )
}

//
