import { useEffect } from 'react';
import { runsActions } from '../../../../../redux/actions';
import {
  runSelectors,
  runPagesSelectors,
  projectSelectors,
} from '../../../../../redux/selectors';
import { useDispatch, useSelector } from '../../../../hooks';

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

export const useService = (
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[],
): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);
  const dispatch = useDispatch();
  const runs = useSelector(runSelectors.myRuns);
  const selectedProject = useSelector(projectSelectors.selectedProject);
  const runsPaginated = useSelector(runSelectors.myRunsPaginated);
  const isValidFilter = filter.map((f) => f.value).join('');
  useEffect(() => {
    if (!isValidFilter) {
      const intervalId = setInterval(() => {
        //assign interval to a variable to clear it.
        dispatch(
          runsActions.allRuns({
            sort_by: 'created',
            logical_operator: 'and',
            project: selectedProject,
            page: runsPaginated.page,
            size: runsPaginated.size,
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId); //This is important
    }
  });
  const runIds = runs.map((run: TRun) => run.id);

  return {
    fetching,
    runIds,
    runsPaginated,
  };
};
