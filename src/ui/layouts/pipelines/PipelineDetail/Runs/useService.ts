import { useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const fetching = useSelector(runPagesSelectors.fetching);
  const runs: TRun[] = useSelector(runSelectors.runsForPipelineId(pipelineId));
  // useEffect(() => {}, [runs]);

  const runIds = runs.map((run: TRun) => run.id);

  return { fetching, runIds };
};
