"use client";

import { Team } from "./types";
import Link from "next/link";
import { FunctionComponent, useState } from "react";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { AllTeamsInfoQuery } from "@/generated/graphql";

type SquareButtonProps = {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SqaureButton: FunctionComponent<SquareButtonProps> = ({
  children,
  onClick,
  active,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "w-40 h-40  text-3xl font-bold  border-2 rounded-md mr-8 transition-all duration-200 ease-in",
        {
          "bg-gradient-to-t from-gradientEnd to-gradientStart text-purple-200 ":
            active,
          "text-white border-pink": !active,
        }
      )}
    >
      {children}
    </button>
  );
};

type TeamSelectProps = {
  teams: Array<{
    __typename?: "Team";
    name?: string | null;
    alias?: string | null;
    sys: { __typename?: "Sys"; id: string };
    linkedFrom?: {
      __typename?: "TeamLinkingCollections";
      chapterCollection?: {
        __typename?: "ChapterCollection";
        items: Array<{
          __typename?: "Chapter";
          linkedFrom?: {
            __typename?: "ChapterLinkingCollections";
            onboardStepCollection?: {
              __typename?: "OnboardStepCollection";
              items: Array<{
                __typename?: "OnboardStep";
                step?: number | null;
                sys: { __typename?: "Sys"; id: string };
              } | null>;
            } | null;
          } | null;
        } | null>;
      } | null;
    } | null;
  } | null>;
};

//get chapters where the teamid is the same as the selected team
// get the first step of the first chapter

export const TeamSelect: FunctionComponent<TeamSelectProps> = ({ teams }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(
    undefined
  );

  const router = useRouter();

  const navigateToFirstStep = async () => {
    //get the first step of the first chapter of the selected team

    if (!teams) return;

    const team = teams?.find((team) => team?.sys.id === selectedTeam);

    const firstChapter = team?.linkedFrom?.chapterCollection?.items.at(0);

    //TODO: sorting is duplicated should move to util
    const sortedSteps = [
      ...(firstChapter?.linkedFrom?.onboardStepCollection?.items ?? []),
    ]?.sort((a, b) => a?.step! - b?.step!);

    const firstStep = sortedSteps.at(0)?.sys?.id;
    //TODO: chapter should also be based on id
    router.push(`/onboarding/${selectedTeam}/1/${firstStep}`);
  };

  return (
    <>
      <div className=" mb-12 flex justify-between ">
        {teams.map((team) => (
          <SqaureButton
            key={team?.alias}
            active={selectedTeam === team?.sys?.id}
            onClick={() => setSelectedTeam(team?.sys?.id ?? undefined)}
            className="w-40 h-40 text-white text-3xl font-bold border-pink border-2 rounded-md mr-8"
          >
            <h3> {team?.alias}</h3>
            <p className="text-sm mt-4">({team?.name})</p>
          </SqaureButton>
        ))}
      </div>

      <div
        className={`${
          selectedTeam
            ? "flex justify-center flex-col items-center"
            : "invisible"
        }`}
      >
        <p className="text-white  text-2xl mt-6">
          {" "}
          Great choise ! now lets learn more about the company
        </p>

        <button
          className="bg-pink text-white rounded-md px-6 py-3 font-bold mt-9 text-xl"
          onClick={navigateToFirstStep}
        >
          {" "}
          i am ready
        </button>
      </div>
    </>
  );
};
