import {
  pipelinePagesSelectors,
  runSelectors,
} from '../../../../../redux/selectors';
import { useSelector } from '../../../../hooks';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = (): ServiceInterface => {
  const fetching = useSelector(pipelinePagesSelectors.fetching);
  const currentWorkspace = useSelector(pipelinePagesSelectors.currentWorkspace);

  const runs = useSelector(runSelectors.myRuns);

  const filteredRuns = runs.filter(
    (run: TRun) => currentWorkspace && run.workspaceId === currentWorkspace.id,
  );

  const runIds = filteredRuns.map((run: TRun) => run.id);

  return {
    fetching,
    runIds,
  };
};
