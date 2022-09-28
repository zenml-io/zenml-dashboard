import { runActionTypes } from '../../actionTypes';
import getAllRunsApi from '../../../api/runs/getAllRunsApi';

export const getAllRunsAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: runActionTypes.getAllRuns.request,
  payload: {
    apiMethod: getAllRunsApi,
    isAuthenticated: true,
    failureActionType: runActionTypes.getAllRuns.failure,
    successActionType: runActionTypes.getAllRuns.success,
    onSuccess,
    onFailure,
  },
});
