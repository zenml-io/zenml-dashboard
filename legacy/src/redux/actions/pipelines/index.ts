import { getMyPipelinesAction } from './getMyPipelinesAction';
import { getPipelineByIdAction } from './getPipelineByIdAction';
import { getAllRunsByPipelineId } from './getAllRunsByPipelineId';

export const pipelinesActions = {
  getMy: getMyPipelinesAction,
  pipelineForId: getPipelineByIdAction,
  allRunsByPipelineId: getAllRunsByPipelineId,
};
