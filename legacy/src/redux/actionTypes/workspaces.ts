import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const workspaceActionTypes = {
  getMyWorkspaces: generateApiActionsTypes(
    actionTypes.WORKSPACES_GET_MY_WORKSPACES,
  ),
  getMyWorkspaceStats: generateApiActionsTypes(
    actionTypes.GET_MY_WORKSPACE_STATS,
  ),
  selectWorkspace: generateApiActionsTypes(
    actionTypes.SELECT_WORKSPACE_FROM_MY_WORKSPACES,
  ),
  updateSelectedWorkspace: actionTypes.UPDATE_SELECTED_WORKSPACE,
};
