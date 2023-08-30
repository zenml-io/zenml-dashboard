import { runSelectors } from '../../../../../../redux/selectors';
import { useSelector } from '../../../../../hooks';
import { Pipeline, Run } from '../../../../../../api/types';
interface ServiceInterface {
  runIds: TId[];
  isPipelineOpen: () => boolean;
}

export const useService = ({
  pipeline,
  openPipelineIds,
}: {
  pipeline: Pipeline;
  openPipelineIds: TId[];
}): ServiceInterface => {
  const runs = useSelector(runSelectors.runsForPipelineId(pipeline.id));

  const runIds = runs.map((run: Run) => run.id);

  return {
    runIds,
    isPipelineOpen: (): boolean => {
      return openPipelineIds.indexOf(pipeline.id) !== -1;
    },
  };
};
