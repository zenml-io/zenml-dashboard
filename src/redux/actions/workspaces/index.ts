import { getMyWorkspacesAction } from './getMyWorkspacesAction';
import { getMyWorkspaceStatsAction } from './getMyWorkspaceStatsAction';
import { updateAccessTokenAction } from './updateSelectedWorkspaces';
import { getSelectedWorkspaceAction } from './getSelectedWorkspaceAction';
export const workspacesActions = {
  getMy: getMyWorkspacesAction,
  getMyWorkspaceStats: getMyWorkspaceStatsAction,
  getSelectedWorkspace: getSelectedWorkspaceAction,
  updateSelectedWorkspace: updateAccessTokenAction,
};
