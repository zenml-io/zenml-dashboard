import { pipelineActionTypes } from '../../actionTypes';
import getMyPipelinesApi from '../../../api/pipelines/getMyPipelinesApi';

export const getMyStacksAction = (): TRequestAction => ({
  type: pipelineActionTypes.getMyPipelines.request,
  payload: {
    apiMethod: getMyPipelinesApi,
    isAuthenticated: true,
    failureActionType: pipelineActionTypes.getMyPipelines.failure,
    successActionType: pipelineActionTypes.getMyPipelines.success,
  },
});
