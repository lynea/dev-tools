import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { ProgressBar } from "@/components/Progres/Progres";
import { Title } from "@/components/Title/Title";
import ReactMarkdown from "react-markdown";

import Link from "next/link";
import { getClient } from "../../../../../graphql/client";
import { teamsQuery } from "../../../../../graphql/queries/teams";
import {
  TeamsQuery,
  TodosForStepQuery,
} from "../../../../../generated/graphql";
import { todosForStepQuery } from "@/graphql/queries/todo";
import { TodoOverView } from "@/components/TodoOverView/TodoOverview";
import { StepButton } from "@/components/StepButton/StepButton";

import { currentUser } from "@clerk/nextjs/app-beta";
import type { User } from "@clerk/nextjs/api";

import { TodoItem } from "@/components/TodoItemExperimental/TodoItem";

import { getTodosForUser } from "@/utils/requests/_requests";
import { TodoList } from "@/components/TodoOverView/TodoList";
import {
  incrementChapter,
  incrementStep,
  decrementStep,
  decrementChapter,
  convertCMSTodosForDB,
} from "./utils";
import { StepPageParams } from "@/app/onboarding/types/pageProps";
import { TodoForDb } from "@/app/onboarding/types/todo";
import Image from "next/image";

export default async function Page({ params }: { params: StepPageParams }) {
  const user: User | null = await currentUser();

  if (!user) return <>no user was found</>;

  const dbTodos = await getTodosForUser(user.id);

  const client = getClient();

  const { data }: { data: TeamsQuery } = await client.query({
    query: teamsQuery,
    variables: {
      id: params.teamId,
    },
  });

  const teamInfo = data.team;

  const totalChapters = teamInfo?.linkedFrom?.chapterCollection?.total;

  const chapterInfo = teamInfo?.linkedFrom?.chapterCollection?.items.find(
    (chapter) => chapter?.id === Number(params.chapterId)
  );

  const previousChapterInfo =
    teamInfo?.linkedFrom?.chapterCollection?.items.find(
      (chapter) => chapter?.id === Number(params.chapterId) - 1
    );

  const nextChapterInfo = teamInfo?.linkedFrom?.chapterCollection?.items.find(
    (chapter) => chapter?.id === Number(params.chapterId) + 1
  );

  const stepsForChapter = chapterInfo?.linkedFrom?.onboardStepCollection?.items;

  const currentChapter = Number(params.chapterId);
  const totalSteps = chapterInfo?.linkedFrom?.onboardStepCollection?.total ?? 0;
  // const totalStepsOfPreviousChapter =
  //   previousChapterInfo?.linkedFrom?.onboardStepCollection?.total ?? 0;

  //Todo: refactor so that we dont rely on the step to be present
  // a better way would be to use the sys id of the step
  // sort them when fetched
  // and then use the index of the step to get the next step

  const sortedSteps = [...(stepsForChapter ?? [])]?.sort(
    (a, b) => a?.step! - b?.step!
  );

  //get the index of the current step
  const indexOfCurrentStep = sortedSteps?.findIndex(
    (step) => step?.sys.id === params.stepId
  );

  const currentStepInfo = sortedSteps?.at(indexOfCurrentStep);

  const { data: todoData }: { data: TodosForStepQuery } = await client
    .query({
      query: todosForStepQuery,
      variables: {
        stepId: currentStepInfo?.sys.id,
      },
    })
    .catch((err) => {
      console.log(err);
      return { data: { onboardStep: null } };
    });

  const todosToRender: TodoForDb[] = convertCMSTodosForDB(
    todoData,
    user.id,
    dbTodos
  );

  const isLastChapter = currentChapter === totalChapters;

  const canDecrementStep = indexOfCurrentStep !== 0 || currentChapter !== 1;

  const isLastStepInChapter = indexOfCurrentStep + 1 === totalSteps;
  const isfirstStepInChapter = indexOfCurrentStep === 0;

  console.log(sortedSteps.map((s) => ({ name: s?.title, step: s?.step })));
  console.log("index", indexOfCurrentStep);

  const basePath = `/onboarding/${params.teamId}`;

  const generateNextLink = (): string => {
    if (isLastStepInChapter) {
      if (isLastChapter) {
        return `/onboarding/completed`;
      }

      const firstStepId = [
        ...(nextChapterInfo?.linkedFrom?.onboardStepCollection?.items ?? []),
      ]
        ?.sort((a, b) => a?.step! - b?.step!)
        .at(0)?.sys.id;

      const id = nextChapterInfo?.id;

      if (!id || !firstStepId) throw new Error("could not generate next link");

      return incrementChapter(basePath, {
        id,
        firstStepId,
      });
    }

    return incrementStep(
      basePath,
      currentChapter,
      sortedSteps?.at(indexOfCurrentStep + 1)?.sys.id!
    );
  };

  const generatePreviousLink = (): string => {
    if (isfirstStepInChapter) {
      const stepsofPreviousChapter = [
        ...(previousChapterInfo?.linkedFrom?.onboardStepCollection?.items ??
          []),
      ];

      const lastStepOfPreviousChapter = stepsofPreviousChapter
        ?.sort((a, b) => a?.step! - b?.step!)
        .at(stepsofPreviousChapter.length - 1)?.sys.id;

      if (!lastStepOfPreviousChapter)
        throw new Error("could not generate previous link");

      return decrementChapter(
        basePath,
        currentChapter,
        lastStepOfPreviousChapter
      );
    }

    return decrementStep(
      basePath,
      currentChapter,
      sortedSteps?.at(indexOfCurrentStep - 1)?.sys.id!
    );
  };

  if (!currentStepInfo)
    return <h2> oops it looks like that step does not exist </h2>;

  return (
    <section className="w-full flex">
      <div className="w-full [&>_div]:mt-4">
        <Box>
          <Title>{currentStepInfo?.title}</Title>
          {todoData.onboardStep?.mainImage?.url ? (
            <div className="relative w-80 h-60 rounded-sm overflow-hidden">
              <Image
                src={todoData.onboardStep?.mainImage?.url}
                fill={true}
                objectFit="contain"
                alt="Picture of the author"
              />
            </div>
          ) : null}

          <ReactMarkdown>{currentStepInfo.body ?? ""}</ReactMarkdown>
          {currentStepInfo?.codeBlock && (
            <code className="mt-6 block rounded-md bg-purple-200 p-4 ">
              <ReactMarkdown>{currentStepInfo.codeBlock ?? ""}</ReactMarkdown>
            </code>
          )}
        </Box>
        {todosToRender?.length > 0 ? (
          <Box>
            <h3 className="text-2xl mb-4 font-bold">Todo:</h3>
            <div className="flex flex-col" data-testid="body-todos">
              {todosToRender?.map((todo) => (
                <TodoItem todo={todo} userId={user.id} key={todo.cmsId} />
              ))}
            </div>
          </Box>
        ) : null}

        <div className="mt-8 flex justify-center items-center gap-10">
          {canDecrementStep ? (
            <Link href={generatePreviousLink()}>
              <Button variant="primary">Previous</Button>
            </Link>
          ) : null}

          <ProgressBar max={totalSteps} value={Number(params.stepId)} />

          <StepButton
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
    </section>
  );
}
