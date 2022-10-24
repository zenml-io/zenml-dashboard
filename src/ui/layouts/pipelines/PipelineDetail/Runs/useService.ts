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
}

export const useService = ({
  pipelineId,
}: {
  pipelineId: TId;
}): ServiceInterface => {
  const dispatch = useDispatch();
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(runSelectors.runsForPipelineId(pipelineId));

  useEffect(() => {
    const intervalId = setInterval(() => {
      //assign interval to a variable to clear it.

      dispatch(
        pipelinesActions.allRunsByPipelineId({
          pipelineId: pipelineId,
        }),
      );
    }, 5000);

    return () => clearInterval(intervalId);

    //This is important
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipelineId]);

  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds };
};
