import { runSelectors } from '../../../../../../redux/selectors';
import { getLastThreeRuns } from '../../../../../../utils';
import { useSelector } from '../../../../../hooks';
import { Run, Stack } from '../../../../../../api/types';

interface ServiceInterface {
  lastThreeRuns: Run[];
}

export const useService = ({ stack }: { stack: Stack }): ServiceInterface => {
  const runs = useSelector(runSelectors.runsForPipelineId(stack.id));

  const lastThreeRuns = getLastThreeRuns(runs);

  return { lastThreeRuns };
};
