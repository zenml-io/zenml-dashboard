import { useEffect } from 'react';
import { pipelinesActions, runsActions } from '../../../../../redux/actions';
import {
  pipelinePagesSelectors,
  runSelectors,
} from '../../../../../redux/selectors';
import { useSelector, useDispatch } from '../../../../hooks';

interface ServiceInterface {
  fetching: boolean;
  runIds: TId[];
}

export const useService = (): ServiceInterface => {
  const fetching = useSelector(pipelinePagesSelectors.fetching);
  // const currentWorkspace = useSelector(pipelinePagesSelectors.currentWorkspace);

  // const runs1 = useSelector((state: any) => {
  //   debugger;
  //   return state.persisted.runs.allNewRuns || [];
  // });
  const dispatch = useDispatch();
  const runs = useSelector(runSelectors.myRuns);
  useEffect(() => {}, [runs]);

  const runIds = runs.map((run: TRun) => run.id);

  return {
    fetching,
    runIds,
  };
};
