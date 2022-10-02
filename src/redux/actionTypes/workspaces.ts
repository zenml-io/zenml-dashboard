import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const workspaceActionTypes = {
  getMyWorkspaces: generateApiActionsTypes(
    actionTypes.WORKSPACES_GET_MY_WORKSPACES,
  ),
  getPipelinesForWorkspaceId: generateApiActionsTypes(
    actionTypes.WORKSPACES_GET_PIPELINES_FOR_WORKSPACE_ID,
  ),
};
