import { runActionTypes } from '../../actionTypes';
import getRunByIdApi from '../../../api/runs/getRunByIdApi';

export const getRunByIdAction = ({
  runId,
  pipelineId,
  workspaceId,
  onSuccess,
  onFailure,
}: {
  runId: TId;
  pipelineId: TId;
  workspaceId?: TId | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: runActionTypes.getRunForId.request,
  payload: {
    apiMethod: getRunByIdApi,
    isAuthenticated: true,
    failureActionType: runActionTypes.getRunForId.failure,
    successActionType: runActionTypes.getRunForId.success,
    params: { runId, pipelineId, workspaceId },
    onSuccess,
    onFailure,
  },
});
