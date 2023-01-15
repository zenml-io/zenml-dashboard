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
  runsPaginated: any;
}
interface filterValue {
  label: string;
  type: string;
  value: string;
}
export const useService = ({
  stackId,
  filter,
}: {
  stackId: TId;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const dispatch = useDispatch();
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(runSelectors.runsForStackId(stackId));
  const runsPaginated = useSelector(runSelectors.myRunsPaginated);
  const isValidFilter = filter.map((f) => f.value).join('');
  console.log(runsPaginated, 'runsPaginated');
  useEffect(() => {
    if (!isValidFilter) {
      const intervalId = setInterval(() => {
        //assign interval to a variable to clear it.

        dispatch(
          stacksActions.allRunsByStackId({
            sort_by: 'created',
            logical_operator: 'and',
            stackId: stackId,
            page: runsPaginated.page,
            size: runsPaginated.size,
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId);
    }
    //This is important
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stackId, runsPaginated]);
  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds, runsPaginated };
};
