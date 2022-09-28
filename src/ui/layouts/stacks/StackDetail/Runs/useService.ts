import { useSelector } from 'react-redux';
import {
  stackPagesSelectors,
  runSelectors,
} from '../../../../../redux/selectors';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const fetching = useSelector(stackPagesSelectors.fetching);
  const runs: TRun[] = useSelector(runSelectors.runsForStackId(stackId));

  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds };
};
