"use client";

import { FunctionComponent, useState } from "react";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

type SquareButtonProps = {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SqaureButton: FunctionComponent<SquareButtonProps> = ({
  children,
  onClick,
  disabled,
  active,
  ...otherProps
}) => {
  return (
    <button
      {...otherProps}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "w-40 h-40  text-3xl font-bold  border-2 rounded-md mr-8 transition-all duration-200 ease-in",
        {
          "bg-gradient-to-t from-gradientEnd to-gradientStart text-main-200 ":
            active && !disabled,
          "text-white border-pink": !active && !disabled,
          "text-gray-500 cursor-not-allowed border-gray-500": disabled,
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
          id?: number | null;
          sys: { __typename?: "Sys"; id: string };
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
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const getChaptersForTeam = (id: string) => {
    // get chapters for team
    const team = teams?.find((team) => team?.sys.id === id);
    const chapters = team?.linkedFrom?.chapterCollection?.items;
    return chapters;
  };

  const navigateToFirstStep = async () => {
    //get the first step of the first chapter of the selected team
    setLoading(true);
    if (!teams || !selectedTeam) return;

    const sortedChapters = [...(getChaptersForTeam(selectedTeam) ?? [])]?.sort(
      (a, b) => a?.id! - b?.id!
    );

    if (sortedChapters.length < 1) {
      return;
    }

    const firstChapter = sortedChapters.at(0);

    if (!firstChapter?.sys.id) return;

    //TODO: sorting is duplicated should move to util
    const sortedSteps = [
      ...(firstChapter?.linkedFrom?.onboardStepCollection?.items ?? []),
    ]?.sort((a, b) => a?.step! - b?.step!);

    const firstStep = sortedSteps.at(0)?.sys?.id;
    //TODO: chapter should also be based on id
    router.push(
      `/onboarding/${selectedTeam}/${firstChapter?.sys?.id}/${firstStep}`
    );
  };

  return (
    <>
      <div className=" mb-12 flex justify-between ">
        {teams.map((team) => (
          <SqaureButton
            disabled={getChaptersForTeam(team?.sys?.id!)?.length === 0}
            key={team?.alias}
            active={selectedTeam === team?.sys?.id}
            onClick={() => {
              setLoading(false);

              setSelectedTeam(team?.sys?.id ?? undefined);
            }}
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
          className={`bg-pink-600 text-white rounded-md px-6 py-3 font-bold mt-9 text-xl ${
            loading ? "" : "animate-bounce"
          }  `}
          onClick={navigateToFirstStep}
          disabled={loading}
        >
          {loading ? (
            <FontAwesomeIcon
              icon={faSpinner}
              className="animate-spin mr-4"
            ></FontAwesomeIcon>
          ) : null}

          {loading ? "loading..." : "i am ready"}
        </button>
      </div>
    </>
  );
};
