import { AllTeamsOverview } from "@/components/AllTeamsOverview/AllTeamsOverview";
import { Box } from "@/components/Box/Box";
import { Button } from "@/components/Button/Button";
import { ProgressBar } from "@/components/Progres/Progres";
import { Title } from "@/components/Title/Title";

import {
  _getGoogleSheetClient,
  _readGoogleSheet,
  _readGoogleSpreadsheet,
} from "@/utils/requests/sheets";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { teamName: string; chapterId: string; stepId: string };
}) {
  const sheetId = process.env.SHEET_ID;
  const range = "A1:D10";

  //get the data from the sheet

  const getInfoForTeam = async (teamName: string) => {
    const googleSheetClient = await _getGoogleSheetClient();

    const data = (await _readGoogleSheet(
      googleSheetClient,
      sheetId as string,
      `onboarding-${teamName}`,
      range
    )) as string[][];

    return data?.slice(1).map((stepInfo) => {
      return {
        body: stepInfo[0],
        title: stepInfo[1],
        todo: stepInfo[2],
        chapterId: stepInfo[3],
      };
    });
  };

  const getTotalChapters = async (teamName: string) => {
    const googleSheetClient = await _getGoogleSheetClient();

    const data = (await _readGoogleSheet(
      googleSheetClient,
      sheetId as string,
      `onboarding-${teamName}`,
      "D12"
    )) as string[][];

    return Number(data?.at(0)?.at(0));
  };

  const totalChapters = await getTotalChapters(params.teamName);

  const result = await getInfoForTeam(params.teamName);

  const stepsForChapter = result?.filter(
    (step) => step.chapterId === params.chapterId
  );

  const currentChapter = Number(params.chapterId);
  const currentStep = Number(params.stepId);
  const totalSteps = stepsForChapter?.length;
  const totalStepsOfPreviousChapter = result?.filter(
    (step) => Number(step.chapterId) === Number(params.chapterId) - 1
  ).length;

  const currentStepInfo = stepsForChapter?.at(currentStep);

  const isLastChapter = currentChapter === totalChapters;

  const canDecrementStep = currentStep !== 0 || currentChapter !== 0;

  const isLastStepInChapter = currentStep === totalSteps - 1;
  const isfirstStepInChapter = currentStep === 0;

  const basePath = `/onboarding/${params.teamName}`;

  const incrementStep = () =>
    `${basePath}/${currentChapter}/${currentStep + 1}`;

  const decrementStep = () =>
    `${basePath}/${currentChapter}/${currentStep - 1}`;

  const incrementChapter = () => `${basePath}/${currentChapter + 1}/0`;

  //todo figure out a way to know how many steps there are in that chapter
  const decrementChapter = () =>
    `${basePath}/${currentChapter - 1}/${totalStepsOfPreviousChapter - 1}`;

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

  if (!currentStepInfo)
    return <h2> oops it looks like that step does not exist </h2>;

  return (
    <section className="w-full">
      <div className="w-full">
        <Box>
          <Title>{currentStepInfo?.title}</Title>

          <p>{currentStepInfo.body}</p>
        </Box>

        <div className="mt-8 flex justify-center items-center gap-10">
          {canDecrementStep ? (
            <Link href={generatePreviousLink()}>
              <Button variant="primary">Previous</Button>
            </Link>
          ) : null}

          <ProgressBar
            max={Number(params.stepId)}
            value={stepsForChapter.length}
          />

          <Link href={generateNextLink()}>
            <Button variant="primary">Next</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
