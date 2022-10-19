import { useSelector } from 'react-redux';
import {
  runSelectors,
  runPagesSelectors,
} from '../../../../../redux/selectors';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = ({
  stackComponentId,
}: {
  stackComponentId: TId;
}): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(
    runSelectors.runsForStackComponentId(stackComponentId),
  );

  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds };
};
