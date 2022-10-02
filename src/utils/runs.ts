export const getLastThreeRuns = (runs?: TRun[] | null): TRun[] => {
  if (!runs) return [];

  const lastThreeRuns = [...runs].sort(
    (a: TRun, b: TRun) =>
      new Date(b.kubeflowStartTime).getTime() -
      new Date(a.kubeflowStartTime).getTime(),
  );

  return lastThreeRuns.slice(0, 3);
};
