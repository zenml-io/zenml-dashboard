import { runActionTypes } from '../../actionTypes';
import getRunByIdApi from '../../../api/runs/getRunByIdApi';

export const getRunByIdAction = ({
  runId,
  stackId,
  pipelineId,
  stackComponentId,
  onSuccess,
  onFailure,
}: {
  runId: TId;
  stackId?: TId;
  pipelineId?: TId;
  stackComponentId?: TId;
  onSuccess?: (res: any) => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: runActionTypes.getRunForId.request,
  payload: {
    apiMethod: getRunByIdApi,
    isAuthenticated: true,
    failureActionType: runActionTypes.getRunForId.failure,
    successActionType: runActionTypes.getRunForId.success,
    params: { runId, stackId, pipelineId, stackComponentId },
    onSuccess,
    onFailure,
  },
});
