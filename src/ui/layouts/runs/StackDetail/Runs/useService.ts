import { useSelector } from 'react-redux';
import {
  runSelectors,
  runPagesSelectors,
} from '../../../../../redux/selectors';
import { Run } from '../../../../../api/types';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: Run[] = useSelector(runSelectors.runsForStackId(stackId));

  const runIds = runs.map((run: Run) => run.id);

  return { fetching, runIds };
};
