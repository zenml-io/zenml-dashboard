import { getMyWorkspacesAction } from './getMyWorkspacesAction';
import { getMyWorkspaceStatsAction } from './getMyWorkspaceStatsAction';
import { getSelectedWorkspaceAction } from './getSelectedWorkspaceAction';
export const workspacesActions = {
  getMy: getMyWorkspacesAction,
  getMyWorkspaceStats: getMyWorkspaceStatsAction,
  getSelectedWorkspace: getSelectedWorkspaceAction,
};
