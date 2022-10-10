import { useSelector } from 'react-redux';
import {
  pipelinePagesSelectors,
  runPagesSelectors,
  runSelectors,
} from '../../../../../redux/selectors';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = ({
  pipelineId,
}: {
  pipelineId: TId;
}): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(runSelectors.runsForPipelineId(pipelineId));

  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds };
};
