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
      value: Math.round(
        scoreResults.reduce((p, c) => p + c, 0) / scoreResults.length
      ),
    };
  });

  return res;
};

const getTotalScoresForTeams = (data: string[][], filter: string[]) => {
  const teams = ["Snails", "Bees", "Ducks"];

  const teamScores = [];

  for (const team of teams) {
    if (!filter.includes(team)) continue;

    const teamData =
      data?.filter((personScore) => personScore.includes(team)) ?? [];

    const allScores = teamData.map((data) => Number(data.at(4)));

    const teamScore = {
      name: team,
      value: Math.round(
        allScores.reduce((p, c) => p + c, 0) / allScores.length
      ),
    };
    teamScores.push(teamScore);
  }

  return teamScores;
};

const getTeamNamesForTotal = (teamData: string[][]): (string | undefined)[] => {
  const teams = [...new Set(teamData.map((scoreRow) => scoreRow.at(1)))];

  return teams;
};

const getTeamNames = (teamData: string[][]): (string | undefined)[] => {
  const sliced = teamData.slice(1);

  return sliced?.map((team) => team.at(0));
};

export {
  getScoresForTeams,
  getTeamNames,
  getTotalScoresForTeams,
  getTeamNamesForTotal,
};
