import { runSelectors } from '../../../../../../redux/selectors';
import { useSelector } from '../../../../../hooks';

interface ServiceInterface {
  runIds: TId[];
  isStackOpen: () => boolean;
}

export const useService = ({
  stack,
  openStackIds,
}: {
  stack: TStack;
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
