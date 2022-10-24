import {
  stackPagesSelectors,
  runSelectors,
  runPagesSelectors,
} from '../../../../../redux/selectors';
import { useSelector } from '../../../../hooks';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = (): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);

  const runs = useSelector(runSelectors.myRuns);

  const runIds = runs.map((run: TRun) => run.id);

  return {
    fetching,
    runIds,
  };
};
