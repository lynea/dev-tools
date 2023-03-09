"use client";

import { getScoresForTeams, getTeamNames } from "@/utils/allTeams";
import {
  _getGoogleSheetClient,
  _readGoogleSheet,
  _readGoogleSpreadsheet,
} from "@/utils/requests/sheets";
import { FunctionComponent, useState } from "react";
import { Box } from "../Box/Box";

type ScoreResult = {
  name: string;
  data: any[][] | null | undefined;
}[];

type Score = {
  name: string;
  score: number;
};

type Scores = Array<Score>;

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
    ? getScoresForTeams(lastResults?.data ?? [], selectedTeams)
    : [];

  const secondLastScores = secondLastResults
    ? getScoresForTeams(secondLastResults?.data ?? [], selectedTeams)
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

  return (
    <div>
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
      <Box>
        <div className=" w-full grid  grid-flow-dense gap-2 items-end h-80 grid-rows-6 ">
          {lastScores?.map((score, index) => (
            <>
              <p
                className={`row-start-6 col-start-${
                  index + 1
                } text-center font-bold`}
              >
                {score.name}
              </p>
              {score.score ? (
                <>
                  <div className=" row-start-1 row-span-5 h-full flex justify-center items-end">
                    {shouldCompare ? (
                      <div
                        style={{
                          height: `${secondLastScores?.at(index)?.score}%`,
                        }}
                        className=" flex items-center flex-col transition-all ease-in-out duration-1000 mr-3 overflow-hidden"
                      >
                        <div
                          className={` h-full bg-gradient-to-t from-gradientEnd to-gradientStart  flex justify-center items-center font-bold w-fit p-4 rounded-sm`}
                        >
                          <p className="text-5xl">
                            {secondLastScores?.at(index)?.score ?? 0}
                          </p>
                        </div>
                      </div>
                    ) : null}
                    <div
                      style={{
                        height: `${score.score}%`,
                      }}
                      className=" flex items-center flex-col transition-all ease-in-out duration-1000"
                    >
                      <div
                        className={` h-full bg-gradient-to-t from-gradientEnd to-gradientStart  flex justify-center items-center font-bold w-fit p-4 rounded-sm`}
                      >
                        <p className="text-5xl">{score?.score ?? 0}</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}
            </>
          ))}
        </div>
      </Box>
      <div className="flex justify-center mt-6 ">
        {teamNames.length &&
          teamNames?.map((teamName, index) => (
            <button
              key={teamName + index}
              className={`mr-5  rounded-sm px-2 py-1 font-bold ${
                teamName && selectedTeams.includes(teamName)
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
  );
};
