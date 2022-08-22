import { workspaceActionTypes } from '../../actionTypes';
import { getPipelinesByWorkspaceIdAction } from './getPipelinesByWorkspaceIdAction';
import getPipelinesByWorkspaceIdApi from '../../../api/workspaces/getPipelinesByWorkspaceIdApi';

import { testApiAction } from '../testUtils/testApiAction';

const id = 'id';
const onSuccess = jest.fn();
const onFailure = jest.fn();

export const onAction = (): any =>
  getPipelinesByWorkspaceIdAction({ id, onSuccess, onFailure });

testApiAction({
  onAction,
  type: workspaceActionTypes.getPipelinesForWorkspaceId.request,
  payload: {
    apiMethod: getPipelinesByWorkspaceIdApi,
    isAuthenticated: true,
    failureActionType: workspaceActionTypes.getPipelinesForWorkspaceId.failure,
    successActionType: workspaceActionTypes.getPipelinesForWorkspaceId.success,
    params: { id },
    onSuccess,
    onFailure,
  },
});
