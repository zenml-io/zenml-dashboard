import { getStackByIdAction } from './getStackByIdAction';
import { pipelineActionTypes } from '../../actionTypes';
import getPipelineByIdApi from '../../../api/pipelines/getPipelineByIdApi';

import { testApiAction } from '../testUtils/testApiAction';

const pipelineId = 'pipelineId';

const onSuccess = jest.fn();
const onFailure = jest.fn();

export const onAction = (): any =>
  getStackByIdAction({ pipelineId, onSuccess, onFailure });

testApiAction({
  onAction,
  type: pipelineActionTypes.getPipelineForId.request,
  payload: {
    apiMethod: getPipelineByIdApi,
    isAuthenticated: true,
    failureActionType: pipelineActionTypes.getPipelineForId.failure,
    successActionType: pipelineActionTypes.getPipelineForId.success,
    params: { pipelineId },
    onFailure,
    onSuccess,
  },
});
