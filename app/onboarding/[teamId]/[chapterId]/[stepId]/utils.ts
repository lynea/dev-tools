import { TodoForDb } from "@/app/onboarding/types/todo";
import { TodosForStepQuery } from "@/generated/graphql";
import { Todo } from "@prisma/client";

const incrementStep = (
  basePath: string,
  currentChapter: number,
  nextStepId: string
) => `${basePath}/${currentChapter}/${nextStepId}`;

const decrementStep = (
  basePath: string,
  currentChapter: number,
  previousStepId: string
) => {
  return `${basePath}/${currentChapter}/${previousStepId}`;
};

//how can i know the first step of the next chapter ?
const incrementChapter = (
  basePath: string,
  nextChapterInfo: { id: number; firstStepId: string }
) => `${basePath}/${nextChapterInfo.id}/${nextChapterInfo.firstStepId}`;

const decrementChapter = (
  basePath: string,
  currentChapter: number,
  lastStepOfPreviousChapter: string
) => `${basePath}/${currentChapter - 1}/${lastStepOfPreviousChapter}`;

const generatePreviousLink = (
  isFirstStepInChapter: boolean, // change the type to boolean
  basePath: string,
  currentChapter: number,
  currentStep: string,
  totalStepsOfPreviousChapter: string
): string => {
  if (isFirstStepInChapter) {
    return decrementChapter(
      basePath,
      currentChapter,
      totalStepsOfPreviousChapter
    );
  }

  return decrementStep(basePath, currentChapter, currentStep);
};

const convertCMSTodosForDB = (
  cmsTodos: TodosForStepQuery,
  owner: string,
  dbTodos: Todo[]
): TodoForDb[] => {
  return (
    cmsTodos?.onboardStep?.linkedFrom?.todoCollection?.items.map(
      (todoForStep) => ({
        title: todoForStep?.title ?? "",
        body: todoForStep?.description ?? "",
        cmsId: todoForStep?.sys?.id ?? "",

        owner,
        completed:
          dbTodos.find((todo) => todo.cmsId === todoForStep?.sys?.id)
            ?.completed ?? false,
      })
    ) || []
  );
};

export {
  incrementStep,
  decrementStep,
  incrementChapter,
  decrementChapter,
  generatePreviousLink,
  convertCMSTodosForDB,
};
