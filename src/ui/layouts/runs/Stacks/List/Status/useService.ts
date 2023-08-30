import { Run } from '../../../../../../api/types';
import { runSelectors } from '../../../../../../redux/selectors';
import { getLastThreeRuns } from '../../../../../../utils';
import { useSelector } from '../../../../../hooks';

interface ServiceInterface {
  lastThreeRuns: Run[];
}

export const useService = ({ stack }: { stack: TStack }): ServiceInterface => {
  const runs = useSelector(runSelectors.runsForPipelineId(stack.id));

  const lastThreeRuns = getLastThreeRuns(runs);

  return { lastThreeRuns };
};
