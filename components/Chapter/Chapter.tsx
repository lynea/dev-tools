import { TodoForDb } from '@/app/onboarding/types/todo'
import { TodosForStepQuery, Chapter as IChapter } from '@/generated/graphql'
import { getClient } from '@/graphql/client'
import { todosForStepQuery } from '@/graphql/queries/todo'
import { db } from '@/lib/db'
import { getTodosForUser } from '@/utils/requests/_requests'
import {
    convertCMSTodosForDB,
    incrementChapter,
    incrementStep,
    decrementChapter,
    decrementStep,
} from '@/utils/todo'
import { currentUser } from '@clerk/nextjs'
import { faCircleCheck, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { User } from '@prisma/client'
import clsx from 'clsx'
import { headers } from 'next/headers'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { Box } from '../Box/Box'
import { ImageViewer } from '../ImageViewer/ImageViewer'
import { ProgressBar } from '../Progres/Progres'
import { StepButton } from '../StepButton/StepButton'
import { Title } from '../Title/Title'
import { TodoWrapper } from '../TodoWrapper/TodoWrapper'
import { Button } from '../Button/Button'

const getFirstStepId = (chapter: IChapter) => {
    const sortedSteps = [
        ...(chapter?.linkedFrom?.onboardStepCollection?.items ?? []),
    ]?.sort((a, b) => a?.step! - b?.step!)

    return sortedSteps.at(0)?.sys?.id
}

//@ts-ignore
export const Chapter = async ({
    chapterId,
    stepId,
    chapters,
    basePath,
    chapterCompletedLink,
}) => {
    const user: User | null = await currentUser()

    const host = headers().get('host')
    if (!user) return <>no user was found</>

    const dbTodos = await getTodosForUser(user.id, host!)

    const dbUser = await db.user.findFirst({
        where: {
            id: user.id,
        },
    })

    const hasCompletedAll = dbUser?.hasCompleted

    const client = getClient()

    //should get all the chapters for the entity example all chapters for the company
    // then it should pass the chapters

    // const sortedChapters = [...(data?.chapterCollection?.items ?? [])]?.sort(
    //     (a, b) => a?.id! - b?.id!
    // )

    const sortedChapters = [...(chapters?.items ?? [])]

    console.log('sortedChapters', sortedChapters)

    const totalChapters = chapters?.total ?? 0

    const indexOfCurrentChapter = sortedChapters.findIndex(
        (chapter) => chapter?.sys.id === chapterId
    )

    if (indexOfCurrentChapter < 0)
        return <>no chapter was found matching this id</>

    const chapterInfo = sortedChapters.at(indexOfCurrentChapter)

    //TODO: would be nicer to find the index of the current one and then slice the next and the prev ones out;
    // and then do [prev, current, next] = sliced

    const previousChapterInfo = sortedChapters.at(indexOfCurrentChapter - 1)

    const nextChapterInfo = sortedChapters.at(indexOfCurrentChapter + 1)

    const stepsForChapter =
        chapterInfo?.linkedFrom?.onboardStepCollection?.items

    const totalSteps =
        chapterInfo?.linkedFrom?.onboardStepCollection?.total ?? 0

    const sortedSteps = [...(stepsForChapter ?? [])]?.sort(
        (a, b) => a?.step! - b?.step!
    )

    //get the index of the current step
    const indexOfCurrentStep = sortedSteps?.findIndex(
        (step) => step?.sys.id === stepId
    )

    const currentStepInfo = sortedSteps?.at(indexOfCurrentStep)

    console.log('currentStepInfo', currentStepInfo)

    const { data: todoData }: { data: TodosForStepQuery } = await client
        .query({
            query: todosForStepQuery,
            variables: {
                stepId: currentStepInfo?.sys.id,
            },
        })
        .catch((err) => {
            console.log('failed to get todos for step from the cms', err)
            return { data: { onboardStep: null } }
        })

    const todosToRender: TodoForDb[] = convertCMSTodosForDB(
        todoData,
        user.id,
        chapterId ?? '',
        stepId,
        dbTodos
    )

    const isLastChapter = indexOfCurrentChapter + 1 === totalChapters

    console.log(`${indexOfCurrentStep !== 0} &  ${indexOfCurrentChapter}`)

    const canDecrementStep = indexOfCurrentStep !== 0

    const isLastStepInChapter = indexOfCurrentStep + 1 === totalSteps
    const isfirstStepInChapter = indexOfCurrentStep === 0

    // const basePath = `/onboarding/global`

    //should accept a item array
    // and the path to route to when no more items are left
    // and the index of the current step
    const generateNextLink = (): string => {
        if (isLastStepInChapter) {
            console.log('last step in chapter')
            if (isLastChapter) {
                console.log('last chapter', chapterCompletedLink)
                return chapterCompletedLink
            }

            const firstStepId = [
                ...(nextChapterInfo?.linkedFrom?.onboardStepCollection?.items ??
                    []),
            ]
                ?.sort((a, b) => a?.step! - b?.step!)
                .at(0)?.sys.id

            const id = nextChapterInfo?.sys.id

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
            sortedSteps?.at(indexOfCurrentStep + 1)?.sys.id!
        )
    }

    const generatePreviousLink = (): string => {
        if (isfirstStepInChapter) {
            const stepsofPreviousChapter = [
                ...(previousChapterInfo?.linkedFrom?.onboardStepCollection
                    ?.items ?? []),
            ]

            const lastStepOfPreviousChapter = stepsofPreviousChapter
                ?.sort((a, b) => a?.step! - b?.step!)
                .at(stepsofPreviousChapter.length - 1)?.sys.id

            if (!lastStepOfPreviousChapter)
                throw new Error('could not generate previous link')

            return decrementChapter(
                basePath,
                previousChapterInfo?.sys.id!,
                lastStepOfPreviousChapter
            )
        }

        return decrementStep(
            basePath,
            chapterId,
            sortedSteps?.at(indexOfCurrentStep - 1)?.sys.id!
        )
    }

    if (!currentStepInfo)
        return <h2> oops it looks like that step does not exist </h2>

    return (
        <>
            <section className="flex w-full">
                <div className="w-full [&>_div]:mt-4">
                    {todoData.onboardStep?.mainImage?.url ? (
                        <ImageViewer
                            url={todoData.onboardStep?.mainImage?.url}
                        />
                    ) : null}

                    <Box>
                        <Title>{currentStepInfo?.title}</Title>

                        <ReactMarkdown>
                            {currentStepInfo.body ?? ''}
                        </ReactMarkdown>
                        {currentStepInfo?.codeBlock && (
                            <code className="mt-6 block rounded-md bg-purple-200 p-4 ">
                                <ReactMarkdown>
                                    {currentStepInfo.codeBlock ?? ''}
                                </ReactMarkdown>
                            </code>
                        )}
                    </Box>
                    {todosToRender?.length > 0 ? (
                        <Box>
                            <h3 className="mb-4 text-2xl font-bold">Todo:</h3>
                            <div
                                className="flex flex-col"
                                data-testid="body-todos"
                            >
                                <TodoWrapper
                                    userId={user.id}
                                    todos={todosToRender}
                                />
                            </div>
                        </Box>
                    ) : null}

                    <div className="mt-8 flex flex-col items-center justify-center gap-10 lg:flex-row">
                        {canDecrementStep ? (
                            <Link
                                href={generatePreviousLink()}
                                className="order-3 w-full lg:order-1 lg:w-auto"
                            >
                                <Button>Previous</Button>
                            </Link>
                        ) : null}

                        <div className="order-2 flex w-full flex-col">
                            <p className="mb-1 justify-between text-center  text-lg text-white ">
                                Step{' '}
                                <span className="font-bold">
                                    {indexOfCurrentStep + 1}
                                </span>{' '}
                                of{' '}
                                <span className="font-bold"> {totalSteps}</span>
                            </p>
                            <ProgressBar
                                max={totalSteps}
                                value={indexOfCurrentStep + 1}
                            />
                        </div>

                        <StepButton
                            host={host!}
                            userId={user.id}
                            route={generateNextLink()}
                            todoInfo={todosToRender}
                        />
                    </div>
                </div>

                <div className="mt-4 ml-6 flex  flex-col items-center ">
                    <ol className="w-72 space-y-4 ">
                        {sortedChapters?.map((chapter, index) => (
                            <li
                                key={chapter?.sys.id}
                                className="cursor-pointer"
                            >
                                <Link
                                    className={
                                        index < indexOfCurrentChapter ||
                                        hasCompletedAll
                                            ? ''
                                            : 'pointer-events-none '
                                    }
                                    href={`/onboarding/global/${chapter?.sys
                                        .id}/${
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
                                            }: ${chapter?.name}`}</h3>
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
