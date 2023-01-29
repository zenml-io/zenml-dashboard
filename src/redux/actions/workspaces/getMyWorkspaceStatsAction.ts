import { workspaceActionTypes } from '../../actionTypes';
import getMyWorkspaceStatsApi from '../../../api/workspaces/getMyWorkspaceStatsApi';

export const getMyWorkspaceStatsAction = ({
  workspace,
  onSuccess,
  onFailure,
}: {
  workspace?: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: workspaceActionTypes.getMyWorkspaceStats.request,
  payload: {
    apiMethod: getMyWorkspaceStatsApi,
    isAuthenticated: true,
    failureActionType: workspaceActionTypes.getMyWorkspaceStats.failure,
    successActionType: workspaceActionTypes.getMyWorkspaceStats.success,
    params: { workspace },
    onSuccess,
    onFailure,
  },
});
