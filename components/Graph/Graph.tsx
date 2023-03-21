import { FunctionComponent } from "react";
import { Box } from "../Box/Box";
import { getScoreDifference } from "./helpers/scores";

type Score = {
  name: string;
  value: number;
};

type GraphProps = {
  scoreRuns: Score[][];
};

//ScoreRuns [scorerun]
// ScoreRun []

export const Graph: FunctionComponent<GraphProps> = ({ scoreRuns }) => {
  if (scoreRuns.length > 2) {
    console.log("only 2 score runs can be shown at the same time ");
  }

  const firstScores = scoreRuns.at(0);
  const secondScores = scoreRuns.at(1);

  return (
    <Box>
      {!firstScores?.length ? (
        <div className="w-full h-80 flex justify-center items-center">
          <h2> no scores to show </h2>
        </div>
      ) : (
        <div className=" w-full grid  grid-flow-dense gap-2 items-end h-80 grid-rows-6 ">
          {firstScores?.map((score, index) => (
            <>
              <p
                className={`row-start-6 col-start-${
                  index + 1
                } text-center font-bold`}
              >
                {`${score.name} ${
                  secondScores?.at(index)?.value && secondScores?.length
                    ? getScoreDifference(
                        score.value,
                        secondScores?.at(index)?.value!!
                      )
                    : ""
                }`}
              </p>
              {score.value ? (
                <>
                  <div className=" row-start-1 row-span-5 h-full flex justify-center items-end">
                    {secondScores?.length ? (
                      <div
                        style={{
                          height: `${secondScores?.at(index)?.value}%`,
                        }}
                        className=" flex items-center flex-col transition-all ease-in-out duration-1000 mr-3 overflow-hidden"
                      >
                        <div
                          className={` h-full bg-gradient-to-t   flex justify-center items-center font-bold w-fit p-4 rounded-sm from-gradientEnd to-gradientStart `}
                        >
                          <p className="text-5xl">
                            {secondScores?.at(index)?.value ?? 0}
                          </p>
                        </div>
                      </div>
                    ) : null}
                    <div
                      style={{
                        height: score.value ? `${score.value}%` : "0",
                      }}
                      className=" flex items-center flex-col transition-height ease-in-out duration-1000"
                    >
                      <div
                        className={` h-full bg-gradient-to-t   flex justify-center items-center font-bold w-fit p-4 rounded-sm ${
                          secondScores?.length &&
                          score.value - secondScores?.at(index)?.value!! > 0
                            ? "from-gradientGreenStart to-gradientGreenEnd"
                            : "from-gradientEnd to-gradientStart"
                        }`}
                      >
                        <p className="text-5xl">{score?.value ?? 0}</p>
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
  );
};
