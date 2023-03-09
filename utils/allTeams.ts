import {
  _getGoogleSheetClient,
  _readGoogleSheet,
  _readGoogleSpreadsheet,
} from "./requests/sheets";

const getScoresForTeams = (data: string[][], filter: string[]) => {
  const contextNames = data.at(0)?.slice(1);
  const scoreData = data.slice(1);

  const res = contextNames?.map((contextName, index) => {
    const scoreResults: number[] = scoreData
      .map((score) => {
        if (
          score.at(0) &&
          (filter?.includes(score.at(0) as string) || filter.length === 0)
        ) {
          return score.at(index + 1);
        } else return undefined;
      })
      .filter((score) => score !== undefined)
      .map((score) => Number(score));

    return {
      name: contextName,
      score: Math.round(
        scoreResults.reduce((p, c) => p + c, 0) / scoreResults.length
      ),
    };
  });

  return res;
};

const getTeamNames = (teamData: string[][]): (string | undefined)[] => {
  const sliced = teamData.slice(1);

  return sliced?.map((team) => team.at(0));
};

export { getScoresForTeams, getTeamNames };
