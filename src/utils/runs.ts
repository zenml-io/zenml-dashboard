import { Run } from '../api/types';

export const getLastThreeRuns = (runs?: Run[] | null): Run[] => {
  if (!runs) return [];

  const lastThreeRuns = [...runs].sort(
    (a: Run, b: Run) =>
      new Date(b.created).getTime() - new Date(a.created).getTime(),
  );

  return lastThreeRuns.slice(0, 3);
};
