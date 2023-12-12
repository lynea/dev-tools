import { TodoForDb } from '@/app/onboarding/types/todo'
import { TodosForStepQuery } from '@/generated/graphql'
import { Todo } from '@prisma/client'

const incrementStep = (
    basePath: string,
    currentChapter: string,
    nextStepId: string
) => `${basePath}/${currentChapter}/${nextStepId}`

const decrementStep = (
    basePath: string,
    currentChapter: string,
    previousStepId: string
) => {
    return `${basePath}/${currentChapter}/${previousStepId}`
}

//how can i know the first step of the next chapter ?
const incrementChapter = (
    basePath: string,
    nextChapterInfo: { id: string; firstStepId: string }
) => `${basePath}/${nextChapterInfo.id}/${nextChapterInfo.firstStepId}`

const decrementChapter = (
    basePath: string,
    prevChapter: string,
    lastStepOfPreviousChapter: string
) => `${basePath}/${prevChapter}/${lastStepOfPreviousChapter}`

const convertCMSTodosForDB = (
    cmsTodos: TodosForStepQuery,
    owner: string,
    currentChapter: string,
    currentStep: string,
    dbTodos: Todo[]
): TodoForDb[] => {
    return (
        cmsTodos?.onboardStep?.linkedFrom?.todoCollection?.items.map(
            (todoForStep) => ({
                title: todoForStep?.title ?? '',
                body: todoForStep?.description ?? '',
                cmsId: todoForStep?.sys?.id ?? '',
                chapterId: currentChapter,
                stepId: currentStep,
                owner,
                completed:
                    dbTodos?.find((todo) => todo.cmsId === todoForStep?.sys?.id)
                        ?.completed ?? false,
            })
        ) || []
    )
}

export {
    incrementStep,
    decrementStep,
    incrementChapter,
    decrementChapter,
    convertCMSTodosForDB,
}
