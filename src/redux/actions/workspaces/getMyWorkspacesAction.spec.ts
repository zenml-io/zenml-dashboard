import { workspaceActionTypes } from '../../actionTypes';
import { getMyWorkspacesAction } from './getMyWorkspacesAction';
import getMyWorkspacesApi from '../../../api/workspaces/getMyWorkspacesApi';

import { testApiAction } from '../testUtils/testApiAction';

const onSuccess = jest.fn();
const onFailure = jest.fn();

export const onAction = (): any =>
  getMyWorkspacesAction({ onSuccess, onFailure });

testApiAction({
  onAction,
  type: workspaceActionTypes.getMyWorkspaces.request,
  payload: {
    apiMethod: getMyWorkspacesApi,
    isAuthenticated: true,
    failureActionType: workspaceActionTypes.getMyWorkspaces.failure,
    successActionType: workspaceActionTypes.getMyWorkspaces.success,
    onSuccess,
    onFailure,
  },
});
