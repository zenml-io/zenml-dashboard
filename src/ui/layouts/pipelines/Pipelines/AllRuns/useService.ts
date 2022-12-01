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
}

export const useService = (): ServiceInterface => {
  const fetching = useSelector(runPagesSelectors.fetching);
  const dispatch = useDispatch();
  const runs = useSelector(runSelectors.myRuns);
  const selectedProject = useSelector(projectSelectors.selectedProject);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.
      dispatch(runsActions.allRuns({ project: selectedProject }));
    }, 5000);

    return () => clearInterval(intervalId); //This is important
  });
  const runIds = runs.map((run: TRun) => run.id);

  return {
    fetching,
    runIds,
  };
};
