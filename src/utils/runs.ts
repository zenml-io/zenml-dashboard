import { Run } from '../api/types';

export const getLastThreeRuns = (runs?: Run[] | null): Run[] => {
  if (!runs) return [];

  const lastThreeRuns = [...runs].sort(
    (a: Run, b: Run) =>
      new Date(b.body.created as string).getTime() -
      new Date(a.body.created as string).getTime(),
  );

  return lastThreeRuns.slice(0, 3);
};
