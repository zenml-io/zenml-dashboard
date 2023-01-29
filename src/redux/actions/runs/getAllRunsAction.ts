import { runActionTypes } from '../../actionTypes';
import getAllRunsApi from '../../../api/runs/getAllRunsApi';

export const getAllRunsAction = ({
  workspace,
  sort_by,
  logical_operator,
  page,
  size,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  sort_by: string;
  logical_operator: string;
  page: number;
  size: number;
  workspace: string;
  filtersParam?: object;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: runActionTypes.getAllRuns.request,
  payload: {
    apiMethod: getAllRunsApi,
    isAuthenticated: true,
    failureActionType: runActionTypes.getAllRuns.failure,
    successActionType: runActionTypes.getAllRuns.success,
    params: { workspace, sort_by, logical_operator, page, size, filtersParam },
    onSuccess,
    onFailure,
  },
});
