"use client";

import { getScoresForTeams, getTeamNames } from "@/utils/allTeams";
import {
  _getGoogleSheetClient,
  _readGoogleSheet,
  _readGoogleSpreadsheet,
} from "@/utils/requests/sheets";
import { FunctionComponent, useState } from "react";
import { useLottie } from "lottie-react";

import { Graph } from "../Graph/Graph";
import { ConfettiAnimation } from "../Confetti/Confetti";

type ScoreResult = {
  name: string;
  data: any[][] | null | undefined;
}[];

type AllTeamsOverviewProps = {
  scoreResult: ScoreResult;
};

export const AllTeamsOverview: FunctionComponent<AllTeamsOverviewProps> = ({
  scoreResult,
}) => {
  const [shouldCompare, setShouldCompare] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  const [lastResults, secondLastResults] = scoreResult;
  //@ts-ignore
  const teamNames: string[] = lastResults.data
    ? getTeamNames(lastResults?.data ?? []).filter(
        (teamName) => teamName !== undefined
      )
    : [];

  const lastScores = lastResults
    ? getScoresForTeams(lastResults?.data ?? [], selectedTeams) ?? []
    : [];

  const secondLastScores =
    secondLastResults && shouldCompare
      ? getScoresForTeams(secondLastResults?.data ?? [], selectedTeams) ?? []
      : [];

  const handleTeamFilter = (teamName: string) => {
    if (!teamName) return;
    if (selectedTeams.includes(teamName)) {
      const dub = [...selectedTeams];

      const removed = dub.filter((item) => item !== teamName);
      setSelectedTeams([...removed]);
    } else {
      setSelectedTeams([...selectedTeams, teamName]);
    }
  };

  const isPartyTime = lastScores?.some((score) => score.value === 100);

  return (
    <div>
      <h2 className="text-white font-bold text-2xl opacity-70 mb-5">
        {lastResults.name}{" "}
        {secondLastResults ? `vs ${secondLastResults.name}` : ""}
      </h2>
      <input
        type="checkbox"
        id="compare"
        className="mb-5"
        onChange={() => setShouldCompare(!shouldCompare)}
      />
      <label className="text-white" htmlFor="compare">
        {" "}
        compare to previous run
      </label>{" "}
      {isPartyTime ? (
        <div className="absolute top-0 ">
          <ConfettiAnimation />
        </div>
      ) : null}
      <Graph scoreRuns={[lastScores, secondLastScores]} />
      <div className="mt-6 flex flex-col items-center w-full ">
        <p className="text-white"> filter by team</p>
        <div className="flex justify-center mt-2 ">
          {teamNames.length &&
            teamNames?.map((teamName, index) => (
              <button
                key={teamName + index}
                className={`mr-5  rounded-sm px-2 py-1 font-bold ${
                  (teamName && selectedTeams.includes(teamName)) ||
                  selectedTeams.length < 1
                    ? "bg-pink text-white"
                    : "bg-white text-purple-200"
                } `}
                onClick={() => handleTeamFilter(teamName!!)}
              >
                {teamName}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};
