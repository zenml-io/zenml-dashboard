import { runSelectors } from '../../../../../../redux/selectors';
import { useSelector } from '../../../../../hooks';
import { Run, Stack } from '../../../../../../api/types';

interface ServiceInterface {
  runIds: TId[];
  isStackOpen: () => boolean;
}

export const useService = ({
  stack,
  openStackIds,
}: {
  stack: Stack;
  openStackIds: TId[];
}): ServiceInterface => {
  const runs = useSelector(runSelectors.runsForPipelineId(stack.id));

  const runIds = runs.map((run: Run) => run.id);

  return {
    runIds,
    isStackOpen: (): boolean => {
      return openStackIds.indexOf(stack.id) !== -1;
    },
  };
};
