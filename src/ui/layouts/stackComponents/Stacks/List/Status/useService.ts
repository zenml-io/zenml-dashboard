import { runSelectors } from '../../../../../../redux/selectors';
import { getLastThreeRuns } from '../../../../../../utils';
import { useSelector } from '../../../../../hooks';
import { Run, StackComponent } from '../../../../../../api/types';

interface ServiceInterface {
  lastThreeRuns: Run[];
}

export const useService = ({
  stack,
}: {
  stack: StackComponent;
}): ServiceInterface => {
  const runs = useSelector(runSelectors.runsForPipelineId(stack.id));

  const lastThreeRuns = getLastThreeRuns(runs);

  return { lastThreeRuns };
};
