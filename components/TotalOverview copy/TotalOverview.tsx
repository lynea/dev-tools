"use client";

import { getTeamNamesForTotal, getTotalScoresForTeams } from "@/utils/allTeams";
import {
  _getGoogleSheetClient,
  _readGoogleSheet,
  _readGoogleSpreadsheet,
} from "@/utils/requests/sheets";
import { FunctionComponent, useState } from "react";
import { Box } from "../Box/Box";
import { useLottie } from "lottie-react";
import confetti from "../../public/confetti.json";

type ScoreResult = {
  name: string;
  data: any[][] | null | undefined;
}[];

type Score = {
  name: string;
  score: number;
};

type Scores = Array<Score>;

type TotalOverviewProps = {
  scoreResult: ScoreResult;
};

const getScoreDifference = (currentScore: number, previousScore: number) => {
  const difference = currentScore - previousScore;

  if (difference <= 0) return difference.toString();

  return `+ ${difference}`;
};

const Animation = () => {
  const animationOptions = {
    animationData: confetti,
    loop: false,
  };

  const { View } = useLottie(animationOptions);

  return <>{View}</>;
};

export const TotalOverview: FunctionComponent<TotalOverviewProps> = ({
  scoreResult,
}) => {
  const [lastResults, secondLastResults] = scoreResult;
  //@ts-ignore
  const teamNames: string[] = lastResults.data
    ? getTeamNamesForTotal(lastResults?.data ?? []).filter(
        (teamName) => teamName !== undefined
      )
    : [];

  //state
  const [shouldCompare, setShouldCompare] = useState(false);
  const [selectedTeams, setSelectedTeams] = useState<string[]>(teamNames);

  const lastScores = lastResults
    ? getTotalScoresForTeams(lastResults?.data ?? [], selectedTeams)
    : [];

  const secondLastScores = secondLastResults
    ? getTotalScoresForTeams(secondLastResults?.data ?? [], selectedTeams)
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

  const isPartyTime = lastScores?.some((score) => score.scores === 100);

  return (
    <div>
      <h2 className="text-white font-bold text-2xl opacity-70 mb-5">
        {lastResults.name}{" "}
        {secondLastResults ? `vs ${secondLastResults.name}` : ""}
      </h2>
      {secondLastResults && (
        <>
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
        </>
      )}

      <Box>
        {isPartyTime ? (
          <div className="absolute top-0 ">
            <Animation />
          </div>
        ) : null}
        {selectedTeams.length < 1 ? (
          <div className="w-full h-80 flex justify-center items-center">
            <h2> no teams where selected yet </h2>
          </div>
        ) : (
          <div className=" w-full grid  grid-flow-dense gap-2 items-end h-80 grid-rows-6 ">
            {lastScores?.map((score, index) => (
              <>
                <p
                  className={`row-start-6 col-start-${
                    index + 1
                  } text-center font-bold`}
                >
                  {`${score.teamName} ${
                    secondLastScores?.at(index)?.scores && shouldCompare
                      ? getScoreDifference(
                          score.scores,
                          secondLastScores?.at(index)?.scores!!
                        )
                      : ""
                  }`}
                </p>
                {score.scores ? (
                  <>
                    <div className=" row-start-1 row-span-5 h-full flex justify-center items-end">
                      {shouldCompare ? (
                        <div
                          style={{
                            height: `${secondLastScores?.at(index)?.scores}%`,
                          }}
                          className=" flex items-center flex-col transition-all ease-in-out duration-1000 mr-3 overflow-hidden"
                        >
                          <div
                            className={` h-full bg-gradient-to-t   flex justify-center items-center font-bold w-fit p-4 rounded-sm from-gradientEnd to-gradientStart `}
                          >
                            <p className="text-5xl">
                              {secondLastScores?.at(index)?.scores ?? 0}
                            </p>
                          </div>
                        </div>
                      ) : null}
                      <div
                        style={{
                          height: score.scores ? `${score.scores}%` : "0",
                        }}
                        className=" flex items-center flex-col transition-height ease-in-out duration-1000"
                      >
                        <div
                          className={` h-full bg-gradient-to-t from-gradientEnd to-gradientStart  flex justify-center items-center font-bold w-fit p-4 rounded-sm ${
                            shouldCompare &&
                            score.scores -
                              secondLastScores?.at(index)?.scores!! >
                              0
                              ? "from-gradientGreenStart to-gradientGreenEnd"
                              : "from-gradientEnd to-gradientStart"
                          }`}
                        >
                          <p className="text-5xl">{score?.scores ?? 0}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ))}
          </div>
        )}
      </Box>
      <div className="mt-6 flex flex-col items-center w-full ">
        <p className="text-white"> filter by team</p>
        <div className="flex justify-center mt-2 ">
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
    </div>
  );
};
