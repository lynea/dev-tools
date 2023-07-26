import { Box } from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'
import { ProgressBar } from '@/components/Progres/Progres'
import { Title } from '@/components/Title/Title'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { teamsQuery } from '../../../../../graphql/queries/teams'
import { clsx } from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { getClient } from '@/lib/client'

import { TeamsQuery, TodosForStepQuery } from '../../../../../generated/graphql'
import { todosForStepQuery } from '@/graphql/queries/todo'
import { TodoOverView } from '@/components/TodoOverView/TodoOverview'
import { StepButton } from '@/components/StepButton/StepButton'

import { currentUser } from '@clerk/nextjs/app-beta'
import type { User } from '@clerk/nextjs/api'

import { TodoItem } from '@/components/TodoItemExperimental/TodoItem'

import { getTodosForUser } from '@/utils/requests/_requests'
import { TodoList } from '@/components/TodoOverView/TodoList'
import {
    incrementChapter,
    incrementStep,
    decrementStep,
    decrementChapter,
    convertCMSTodosForDB,
} from '../../../../../utils/todo'
import { StepPageParams } from '@/app/onboarding/types/pageProps'
import { TodoForDb } from '@/app/onboarding/types/todo'
import Image from 'next/image'
import { headers } from 'next/headers'

export const revalidate = 5

export default async function Page({ params }: { params: StepPageParams }) {
    const user: User | null = await currentUser()
    const host = headers().get('host')

    if (!user) return <>no user was found</>

    const dbTodos = await getTodosForUser(user.id, host!)

    const client = getClient()

    const { data }: { data: TeamsQuery } = await client.query({
        query: teamsQuery,
        variables: {
            id: params.teamId,
        },
    })

    const teamInfo = data.team

    const sortedChapters = [
        ...(teamInfo?.linkedFrom?.chapterCollection?.items ?? []),
    ]?.sort((a, b) => a?.id! - b?.id!)

    const totalChapters = teamInfo?.linkedFrom?.chapterCollection?.total

    const indexOfCurrentChapter = sortedChapters.findIndex(
        (chapter) => chapter?.sys.id === params.chapterId
    )

    if (indexOfCurrentChapter < 0)
        return <>no chapter was found matching this id</>

    const chapterInfo = sortedChapters.at(indexOfCurrentChapter)

    //TODO: would be nicer to find the index of the current one and then slice the next and the prev ones out;
    // and then do [prev, current, next] = sliced

    const previousChapterInfo = sortedChapters.at(indexOfCurrentChapter - 1)

    console.log('previous', previousChapterInfo)

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
        (step) => step?.sys.id === params.stepId
    )

    const currentStepInfo = sortedSteps?.at(indexOfCurrentStep)

    const { data: todoData }: { data: TodosForStepQuery } = await client
        .query({
            query: todosForStepQuery,
            variables: {
                stepId: currentStepInfo?.sys.id,
            },
        })
        .catch((err) => {
            console.log(err)
            return { data: { onboardStep: null } }
        })

    const todosToRender: TodoForDb[] = convertCMSTodosForDB(
        todoData,
        user.id,
        params.chapterId ?? '',
        params.stepId,
        dbTodos
    )

    const isLastChapter = indexOfCurrentChapter + 1 === totalChapters

    const canDecrementStep =
        indexOfCurrentStep !== 0 || indexOfCurrentChapter !== 0

    const isLastStepInChapter = indexOfCurrentStep + 1 === totalSteps
    const isfirstStepInChapter = indexOfCurrentStep === 0

    const basePath = `/onboarding/${params.teamId}`

    const generateNextLink = (): string => {
        if (isLastStepInChapter) {
            if (isLastChapter) {
                return `/onboarding/completed`
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
            params.chapterId,
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
            params.chapterId,
            sortedSteps?.at(indexOfCurrentStep - 1)?.sys.id!
        )
    }

    if (!currentStepInfo)
        return <h2> oops it looks like that step does not exist </h2>

    return (
        <section className="flex w-full">
            <div className="w-full [&>_div]:mt-4">
                {todoData.onboardStep?.mainImage?.url ? (
                    <div className="relative h-80 w-full overflow-hidden rounded-lg">
                        <Image
                            src={todoData.onboardStep?.mainImage?.url}
                            fill={true}
                            objectFit="cover"
                            objectPosition="top"
                            alt="Picture of the author"
                        />
                    </div>
                ) : null}

                <Box>
                    <Title>{currentStepInfo?.title}</Title>

                    <ReactMarkdown>{currentStepInfo.body ?? ''}</ReactMarkdown>
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
                        <div className="flex flex-col" data-testid="body-todos">
                            {todosToRender?.map((todo) => (
                                <TodoItem
                                    todo={todo}
                                    userId={user.id}
                                    key={todo.cmsId}
                                />
                            ))}
                        </div>
                    </Box>
                ) : null}

                <div className="mt-8 flex flex-col items-center justify-center gap-10 lg:flex-row">
                    {canDecrementStep ? (
                        <Link
                            href={generatePreviousLink()}
                            className="order-3 w-full lg:order-1 lg:w-auto"
                        >
                            <Button className="" variant="primary">
                                Previous
                            </Button>
                        </Link>
                    ) : null}

                    <div className="order-2 flex w-full flex-col">
                        <p className="mb-1 justify-between text-center  text-lg text-white ">
                            Step{' '}
                            <span className="font-bold">
                                {indexOfCurrentStep + 1}
                            </span>{' '}
                            of <span className="font-bold"> {totalSteps}</span>
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
            <TodoOverView>
                {/* @ts-ignore */}
                <TodoList />
            </TodoOverView>

            <div className="mt-4 ml-6 flex  flex-col items-center ">
                <ol className="w-72 space-y-4 ">
                    {sortedChapters?.map((chapter, index) => (
                        <li key={chapter?.sys.id}>
                            <div
                                className={clsx(
                                    'w-full rounded-lg  border border-white p-4  ',
                                    {
                                        'bg-gray-100 text-main-200  ':
                                            index > indexOfCurrentChapter,
                                        'bg-pink-400  text-main-200 ':
                                            index < indexOfCurrentChapter,
                                        'border-pink-500 bg-purple-200 font-bold text-purple-700 ':
                                            index === indexOfCurrentChapter,
                                    }
                                )}
                                role="alert"
                            >
                                <div className="flex items-center justify-between">
                                    <span className="sr-only">User info</span>
                                    <h3 className="">{`${
                                        index + 1
                                    }: ${chapter?.name}`}</h3>
                                    {index < indexOfCurrentChapter ? (
                                        <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            className=" h-5 text-xs  "
                                        />
                                    ) : null}
                                    {index === indexOfCurrentChapter ? (
                                        <FontAwesomeIcon
                                            icon={faArrowLeft}
                                            className=" h-5 text-xs  "
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}
