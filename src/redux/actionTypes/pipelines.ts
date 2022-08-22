import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const pipelineActionTypes = {
  getMyPipelines: generateApiActionsTypes(
    actionTypes.PIPELINES_GET_MY_PIPELINES,
  ),
  getPipelineForId: generateApiActionsTypes(
    actionTypes.PIPELINES_GET_PIPELINE_FOR_ID,
  ),
};
