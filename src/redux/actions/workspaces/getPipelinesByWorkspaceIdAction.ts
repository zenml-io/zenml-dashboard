import { workspaceActionTypes } from '../../actionTypes';
import getPipelinesByWorkspaceIdApi from '../../../api/workspaces/getPipelinesByWorkspaceIdApi';

export const getPipelinesByWorkspaceIdAction = ({
  id,
  onSuccess,
  onFailure,
}: {
  id: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
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
