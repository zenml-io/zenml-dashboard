import { useEffect } from 'react';
// import { pipelinesActions, runsActions } from '../../../../../redux/actions';
import {
  pipelinePagesSelectors,
  runSelectors,
} from '../../../../../redux/selectors';
import { useSelector } from '../../../../hooks';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = (): ServiceInterface => {
  const fetching = useSelector(pipelinePagesSelectors.fetching);

  const runs = useSelector(runSelectors.myRuns);
  useEffect(() => {}, [runs]);

  const runIds = runs.map((run: TRun) => run.id);

  return {
    fetching,
    runIds,
  };
};
