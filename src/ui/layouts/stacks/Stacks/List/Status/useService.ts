import { runSelectors } from '../../../../../../redux/selectors';
import { getLastThreeRuns } from '../../../../../../utils';
import { useSelector } from '../../../../../hooks';
import { Stack } from '../../../../../../api/types';

interface ServiceInterface {
  lastThreeRuns: TRun[];
}

export const useService = ({ stack }: { stack: Stack }): ServiceInterface => {
  const runs = useSelector(runSelectors.runsForPipelineId(stack.id));

  const lastThreeRuns = getLastThreeRuns(runs);

  return { lastThreeRuns };
};
