import { runActionTypes } from '../../actionTypes';
import getGraphRunByIdApi from '../../../api/runs/getGraphRunByIdApi';

export const getGrpahByRunsIdAction = ({
  runId,

  onSuccess,
  onFailure,
}: {
  runId: TId;

  onSuccess?: () => void;
  onFailure?: (res: any) => void;
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
