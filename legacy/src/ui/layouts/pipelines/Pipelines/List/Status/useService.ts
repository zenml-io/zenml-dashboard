import { getLastThreeRuns } from '../../../../../../utils';

interface ServiceInterface {
  lastThreeRuns: any[];
}

export const useService = ({
  pipeline,
}: {
  pipeline: any;
}): ServiceInterface => {
  let runs: { status: any; run: any }[] = [];

  pipeline?.runs?.map((item: any, index: string | number) =>
    runs.push({
      status: pipeline.status[index],
      run: pipeline.runs[index],
    }),
  );

  const lastThreeRuns = getLastThreeRuns(runs as any);

  return { lastThreeRuns };
};
