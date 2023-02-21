import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pipelinesActions } from '../../../../../redux/actions';
import {
  runPagesSelectors,
  runSelectors,
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
  filter,
  pipelineId,
  isExpended,
}: {
  isExpended?: any;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
  sortBy: string;
  pipelineId: TId;
}): ServiceInterface => {
  const dispatch = useDispatch();
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(runSelectors.runsForPipelineId(pipelineId));
  const runsPaginated = useSelector(runSelectors.myRunsPaginated);
  const isValidFilter = filter.map((f) => f.value).join('');
  console.log(runsPaginated, 'runsPaginated');
  useEffect(() => {}, [runs]);
  useEffect(() => {
    if (!isValidFilter && !isExpended) {
      const intervalId = setInterval(() => {
        //assign interval to a variable to clear it.

        dispatch(
          pipelinesActions.allRunsByPipelineId({
            sort_by: sortBy,
            logical_operator: 'and',
            pipelineId: pipelineId,
            index: runsPaginated.page,
            max_size: runsPaginated.size,
          }),
        );
      }, 5000);

      return () => clearInterval(intervalId);
    }
    //This is important
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipelineId, runsPaginated]);

  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds, runsPaginated };
};
