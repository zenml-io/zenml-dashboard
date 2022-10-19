import {
  pipelinePagesSelectors,
  runSelectors,
} from '../../../../../../redux/selectors';
import { useSelector } from '../../../../../hooks';

interface ServiceInterface {
  runIds: TId[];
  isPipelineOpen: () => boolean;
}

export const useService = ({
  pipeline,
  openPipelineIds,
}: {
  pipeline: TPipeline;
  openPipelineIds: TId[];
}): ServiceInterface => {
  const runs = useSelector(runSelectors.runsForPipelineId(pipeline.id));

  const runIds = runs.map((run: TRun) => run.id);

  return {
    runIds,
    isPipelineOpen: (): boolean => {
      return openPipelineIds.indexOf(pipeline.id) !== -1;
    },
  };
};
