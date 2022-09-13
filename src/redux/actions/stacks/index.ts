import { getMyStacksAction } from './getMyStacksAction';
import { getStackByIdAction } from './getStackByIdAction';
import { getAllRunsByStackId } from './getAllRunsByStackId';

export const stacksActions = {
  getMy: getMyStacksAction,
  pipelineForId: getStackByIdAction,
  allRunsByPipelineId: getAllRunsByStackId,
};
