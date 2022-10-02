import { getRunByIdAction } from './getRunByIdAction';
import { runActionTypes } from '../../actionTypes';
import getRunByIdApi from '../../../api/runs/getRunByIdApi';

import { testApiAction } from '../testUtils/testApiAction';

const runId = 'runId';
const pipelineId = 'pipelineId';
const workspaceId = 'workspaceId';

const onSuccess = jest.fn();
const onFailure = jest.fn();

export const onAction = (): any =>
  getRunByIdAction({ pipelineId, runId, workspaceId, onSuccess, onFailure });

testApiAction({
  onAction,
  type: runActionTypes.getRunForId.request,
  payload: {
    apiMethod: getRunByIdApi,
    isAuthenticated: true,
    failureActionType: runActionTypes.getRunForId.failure,
    successActionType: runActionTypes.getRunForId.success,
    params: { pipelineId, runId, workspaceId },
    onSuccess,
    onFailure,
  },
});
