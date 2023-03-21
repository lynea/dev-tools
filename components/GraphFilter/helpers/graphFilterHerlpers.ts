import { Score, ScoreRun } from "../types";

const getNamesForRun = (scores: Score[]) => scores.map((score) => score.name);

const getFilterValues = (firstRun: ScoreRun, secondRun?: ScoreRun) => {
  return [
    ...new Set([
      ...getNamesForRun(firstRun?.scores ?? []),
      ...getNamesForRun(secondRun?.scores ?? []),
    ]),
  ];
};

export { getFilterValues, getNamesForRun };
