import { AllTeamsOverview } from "@/components/AllTeamsOverview/AllTeamsOverview";
import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { ProgressBar } from "@/components/Progres/Progres";
import { Title } from "@/components/Title/Title";

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
import { TodoWrapper } from "@/components/TodoWrapper/TodoWrapper";
import { StepTodoWrapper } from "@/components/StepTodoWrapper/StepTodoWrapper";

//for now we fetch all at the same time
// TOTO: see if we can fetch only the data we need

export default async function Page({
  params,
}: {
  params: { teamName: string; chapterId: string; stepId: string };
}) {
  const user: User | null = await currentUser();

  if (!user) return <>no user was found</>;

  const client = getClient();
  //TODO make id dynamic
  const { data }: { data: TeamsQuery } = await client.query({
    query: teamsQuery,
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

  const stepsForChapter = chapterInfo?.linkedFrom?.onboardStepCollection?.items;

  const currentChapter = Number(params.chapterId);
  const currentStep = Number(params.stepId);
  const totalSteps = chapterInfo?.linkedFrom?.onboardStepCollection?.total ?? 0;
  const totalStepsOfPreviousChapter =
    previousChapterInfo?.linkedFrom?.onboardStepCollection?.total ?? 0;

  const currentStepInfo = stepsForChapter?.find(
    (step) => step?.step === currentStep
  );

  const { data: todoData }: { data: TodosForStepQuery } = await client.query({
    query: todosForStepQuery,
    variables: {
      stepId: currentStepInfo?.sys.id,
    },
  });

  const todosForStep:
    | { title: string; description: string; id: string | null | undefined }[]
    | undefined = todoData?.onboardStep?.linkedFrom?.todoCollection?.items.map(
    (todoForStep) => ({
      title: todoForStep?.title ?? "",
      description: todoForStep?.description ?? "",
      id: todoForStep?.sys.id,
    })
  );

  const isLastChapter = currentChapter === totalChapters;

  const canDecrementStep = currentStep !== 1 || currentChapter !== 1;

  const isLastStepInChapter = currentStep === totalSteps;
  const isfirstStepInChapter = currentStep === 1;

  const basePath = `/onboarding/${params.teamName}`;

  const incrementStep = () =>
    `${basePath}/${currentChapter}/${currentStep + 1}`;

  const decrementStep = () =>
    `${basePath}/${currentChapter}/${currentStep - 1}`;

  const incrementChapter = () => `${basePath}/${currentChapter + 1}/1`;

  //todo figure out a way to know how many steps there are in that chapter
  const decrementChapter = () =>
    `${basePath}/${currentChapter - 1}/${totalStepsOfPreviousChapter}`;

  const generateNextLink = (): string => {
    if (isLastStepInChapter) {
      if (isLastChapter) {
        return `/onboarding/completed`;
      }

      return incrementChapter();
    }

    return incrementStep();
  };

  const generatePreviousLink = (): string => {
    if (isfirstStepInChapter) {
      return decrementChapter();
    }

    return decrementStep();
  };

  //TODO: if there is an open todo store it in the database and then redirect to the next page

  if (!currentStepInfo)
    return <h2> oops it looks like that step does not exist </h2>;

  return (
    <section className="w-full flex">
      <div className="w-full">
        <Box>
          <Title>{currentStepInfo?.title}</Title>

          <p>{currentStepInfo.body}</p>
          {currentStepInfo?.codeBlock && (
            <code className="mt-6 block rounded-md bg-purple-200 p-4">
              {currentStepInfo.codeBlock}
            </code>
          )}

          <div className="mt-6">
            <StepTodoWrapper todosForStep={todosForStep ?? []} />
          </div>
        </Box>

        <div className="mt-8 flex justify-center items-center gap-10">
          {canDecrementStep ? (
            <Link href={generatePreviousLink()}>
              <Button variant="primary">Previous</Button>
            </Link>
          ) : null}

          <ProgressBar max={totalSteps} value={Number(params.stepId)} />

          <StepButton
            route={generateNextLink()}
            todoInfo={todosForStep}
          ></StepButton>
        </div>
      </div>
      <TodoOverView>
        <TodoWrapper />
      </TodoOverView>
    </section>
  );
}
