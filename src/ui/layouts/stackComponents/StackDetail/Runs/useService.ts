import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stackComponentsActions } from '../../../../../redux/actions';
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
  const dispatch = useDispatch();
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(
    runSelectors.runsForStackComponentId(stackComponentId),
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.

      dispatch(
        stackComponentsActions.allRunsByStackComponentId({
          stackComponentId: stackComponentId,
        }),
      );
    }, 5000);

    return () => clearInterval(intervalId);

    //This is important
  }, [stackComponentId]);
  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds };
};
