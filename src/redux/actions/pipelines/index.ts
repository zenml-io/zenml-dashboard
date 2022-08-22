import { getMyPipelinesAction } from './getMyPipelinesAction';
import { getPipelineByIdAction } from './getPipelineByIdAction';

export const pipelinesActions = {
  getMy: getMyPipelinesAction,
  pipelineForId: getPipelineByIdAction,
};
