import { pipelineActionTypes } from '../../actionTypes';
import { getStackComponentListAction } from './getStackComponentListAction';
import getMyPipelinesApi from '../../../api/pipelines/getMyPipelinesApi';

import { testApiAction } from '../testUtils/testApiAction';

export const onAction = (): any => getStackComponentListAction();

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
