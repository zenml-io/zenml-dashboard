import { runSelectors } from '../../../../../../redux/selectors';
import { useSelector } from '../../../../../hooks';
import { StackComponent } from '../../../../../../api/types';

interface ServiceInterface {
  runIds: TId[];
  isStackOpen: () => boolean;
}

export const useService = ({
  stack,
  openStackIds,
}: {
  stack: StackComponent;
  openStackIds: TId[];
}): ServiceInterface => {
  const runs = useSelector(runSelectors.runsForPipelineId(stack.id));

  const runIds = runs.map((run: TRun) => run.id);

  return {
    runIds,
    isStackOpen: (): boolean => {
      return openStackIds.indexOf(stack.id) !== -1;
    },
  };
};
