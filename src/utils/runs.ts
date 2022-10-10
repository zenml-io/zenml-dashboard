export const getLastThreeRuns = (runs?: TRun[] | null): TRun[] => {
  if (!runs) return [];

  const lastThreeRuns = [...runs].sort(
    (a: TRun, b: TRun) =>
      new Date(b.created).getTime() - new Date(a.created).getTime(),
  );

  return lastThreeRuns.slice(0, 3);
};
