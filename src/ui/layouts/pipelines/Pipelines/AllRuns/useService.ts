import { useEffect } from 'react';
// import { pipelinesActions, runsActions } from '../../../../../redux/actions';
import {
  runSelectors,
  runPagesSelectors,
} from '../../../../../redux/selectors';
import { useSelector } from '../../../../hooks';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = (): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);
  console.log('test111', fetching);
  const runs = useSelector(runSelectors.myRuns);
  useEffect(() => {}, [runs]);
  // debugger;
  const runIds = runs.map((run: TRun) => run.id);

  return {
    fetching,
    runIds,
  };
};
