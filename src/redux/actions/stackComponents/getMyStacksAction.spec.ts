import { pipelineActionTypes } from '../../actionTypes';
import { getMyStacksAction } from './getMyStackComponentsAction';
import getMyPipelinesApi from '../../../api/pipelines/getMyPipelinesApi';

import { testApiAction } from '../testUtils/testApiAction';

export const onAction = (): any => getMyStacksAction();

testApiAction({
  onAction,
  type: pipelineActionTypes.getMyPipelines.request,
  payload: {
    apiMethod: getMyPipelinesApi,
    isAuthenticated: true,
    failureActionType: pipelineActionTypes.getMyPipelines.failure,
    successActionType: pipelineActionTypes.getMyPipelines.success,
  },
});
