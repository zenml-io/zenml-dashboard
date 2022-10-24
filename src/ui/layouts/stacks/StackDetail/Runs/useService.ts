import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stacksActions } from '../../../../../redux/actions';
import {
  runSelectors,
  runPagesSelectors,
} from '../../../../../redux/selectors';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = ({ stackId }: { stackId: TId }): ServiceInterface => {
  const dispatch = useDispatch();
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(runSelectors.runsForStackId(stackId));
  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.

      dispatch(
        stacksActions.allRunsByStackId({
          stackId: stackId,
        }),
      );
    }, 5000);

    return () => clearInterval(intervalId);

    //This is important
  }, [stackId]);
  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds };
};
