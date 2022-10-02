import { pipelineActionTypes } from '../../actionTypes';
import getMyPipelinesApi from '../../../api/pipelines/getMyPipelinesApi';

export const getMyPipelinesAction = (): TRequestAction => ({
  type: pipelineActionTypes.getMyPipelines.request,
  payload: {
    apiMethod: getMyPipelinesApi,
    isAuthenticated: true,
    failureActionType: pipelineActionTypes.getMyPipelines.failure,
    successActionType: pipelineActionTypes.getMyPipelines.success,
  },
});
