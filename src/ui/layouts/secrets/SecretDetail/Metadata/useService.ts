// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { stacksActions } from '../../../../../redux/actions';
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
  secretId,
  filter,
  isExpended,
}: {
  isExpended?: any;
  secretId: TId;
  sortBy: string;
  filter: {
    column: filterValue;
    type: filterValue;
    value: string;
  }[];
}): ServiceInterface => {
  // const dispatch = useDispatch();
  const fetching = useSelector(runPagesSelectors.fetching);
  // const runs: TRun[] = useSelector(runSelectors.runsForsecretId(secretId));
  const runsPaginated = useSelector(runSelectors.myRunsPaginated);
  // const isValidFilter = filter?.map((f) => f.value).join('');
  // useEffect(() => {}, [runs]);
  // useEffect(() => {
  //   if (!isValidFilter && !isExpended) {
  //     const intervalId = setInterval(() => {
  //       //assign interval to a variable to clear it.

  //       dispatch(
  //         stacksActions.allRunsBysecretId({
  //           sort_by: sortBy,
  //           logical_operator: 'and',
  //           secretId: secretId,
  //           page: runsPaginated.page,
  //           size: runsPaginated.size,
  //         }),
  //       );
  //     }, 5000);

  //     return () => clearInterval(intervalId);
  //   }
  //   //This is important
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [secretId, runsPaginated]);
  // const runIds = runs.map((run: TRun) => run.id);
  const runIds: any = [];

  return { fetching, runIds, runsPaginated };
};
