import { useEffect } from 'react';
import { runsActions } from '../../../../../redux/actions';
import {
  runSelectors,
  runPagesSelectors,
  workspaceSelectors,
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

// export const useService = ({
//   sortBy,
//   filter,
//   pipelineId,
// }: {
//   filter: {
//     column: filterValue;
//     type: filterValue;
//     value: string;
//   }[];
//   sortBy: string;
//   pipelineId: TId;
// }): ServiceInterface => {

export const useService = ({
  filter,
  sortBy,
  isExpended,
}: {
  isExpended?: any;
  sortBy: string;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);
  const dispatch = useDispatch();
  const runs = useSelector(runSelectors.myRuns);
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);
  const runsPaginated = useSelector(runSelectors.myRunsPaginated);
  const isValidFilter = filter?.map((f) => f.value).join('');
  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const intervalId = setInterval(() => {
        //assign interval to a variable to clear it.
        dispatch(
          runsActions.allRuns({
            sort_by: sortBy,
            logical_operator: 'and',
            workspace: selectedWorkspace,
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
