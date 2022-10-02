// import { runSelectors } from '../../../../../../redux/selectors';
import { getLastThreeRuns } from '../../../../../../utils';
// import { useSelector } from '../../../../../hooks';

interface ServiceInterface {
  lastThreeRuns: TRun[];
}

export const useService = ({
  pipeline,
}: {
  pipeline: TPipeline;
}): ServiceInterface => {
  const runs = pipeline.status;
  // debugger;
  const lastThreeRuns = getLastThreeRuns(runs);

  return { lastThreeRuns };
};
