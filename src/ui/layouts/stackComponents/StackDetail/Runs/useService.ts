import { useSelector } from 'react-redux';
import {
  stackPagesSelectors,
  runSelectors,
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
  const fetching = useSelector(stackPagesSelectors.fetching);
  const runs: TRun[] = useSelector(
    runSelectors.runsForStackComponentId(stackComponentId),
  );
  // debugger;
  const runIds = runs.map((run: TRun) => run.id);
  // debugger;
  return { fetching, runIds };
};
