import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { repositoryActions, stacksActions } from '../../../../../redux/actions';
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
  sortBy,
  repositoryId,
  filter,
  isExpended,
}: {
  isExpended?: any;
  repositoryId: TId;
  sortBy: string;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const dispatch = useDispatch();
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(
    runSelectors.runsForRepositoryId(repositoryId),
  );
  const runsPaginated = useSelector(runSelectors.myRunsPaginated);
  const isValidFilter = filter?.map((f) => f.value).join('');
  useEffect(() => {}, [runs]);
  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const intervalId = setInterval(() => {
        //assign interval to a variable to clear it.

        dispatch(
          repositoryActions.getRunsForRepositoryID({
            sort_by: sortBy,
            logical_operator: 'and',
            repositoryID: repositoryId,
            page: runsPaginated.page,
            size: runsPaginated.size,
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId);
    }
    //This is important
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [repositoryId, runsPaginated]);
  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds, runsPaginated };
};
