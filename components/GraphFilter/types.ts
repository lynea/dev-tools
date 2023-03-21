export type Score = {
  name: string;
  value: number;
};

export type ScoreRun = {
  name: string;
  scores: Score[];
};

export type GraphFilterProps = { scoreRuns: ScoreRun[] };
