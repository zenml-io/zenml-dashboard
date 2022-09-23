import {
  stackPagesSelectors,
  runSelectors,
} from '../../../../../../redux/selectors';
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
  const currentWorkspace = useSelector(stackPagesSelectors.currentWorkspace);

  const filteredRuns = runs.filter(
    (run: TRun) => currentWorkspace && run.workspaceId === currentWorkspace.id,
  );

  const runIds = filteredRuns.map((run: TRun) => run.id);

  return {
    runIds,
    isStackOpen: (): boolean => {
      return openStackIds.indexOf(stack.id) !== -1;
    },
  };
};
