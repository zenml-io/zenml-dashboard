import { useSelector } from 'react-redux';
import {
  stackPagesSelectors,
  runSelectors,
  runPagesSelectors,
} from '../../../../../redux/selectors';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(runSelectors.runsForStackId(stackId));

  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds };
};
