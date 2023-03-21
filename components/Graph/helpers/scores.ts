const getScoreDifference = (currentScore: number, previousScore: number) => {
  const difference = currentScore - previousScore;

  if (difference <= 0) return difference.toString();

  return `+ ${difference}`;
};

export { getScoreDifference };
