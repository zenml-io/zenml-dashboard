import { runActionTypes } from '../../actionTypes';
import getGraphRunByIdApi from '../../../api/runs/getGraphRunByIdApi';

export const getGrpahByRunsIdAction = ({
  runId,
  // pipelineId,
  // workspaceId,
  onSuccess,
  onFailure,
}: {
  runId: TId;
  // pipelineId: TId;
  // workspaceId?: TId | null;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: runActionTypes.getGraphForRunId.request,
  payload: {
    apiMethod: getGraphRunByIdApi,
    isAuthenticated: true,
    failureActionType: runActionTypes.getGraphForRunId.failure,
    successActionType: runActionTypes.getGraphForRunId.success,
    params: { runId },
    onSuccess,
    onFailure,
  },
});
