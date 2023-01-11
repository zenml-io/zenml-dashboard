import { stackActionTypes } from '../../actionTypes';
import getMyStacksApi from '../../../api/stacks/getMyStacksApi';

export const getMyStacksAction = ({
  project,
  page,
  size,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  project: string;
  page: number;
  size: number;
  filtersParam?: object;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stackActionTypes.getMyStacks.request,
  payload: {
    apiMethod: getMyStacksApi,
    isAuthenticated: true,
    failureActionType: stackActionTypes.getMyStacks.failure,
    successActionType: stackActionTypes.getMyStacks.success,
    params: { project, page, size, filtersParam },
    onSuccess,
    onFailure,
  },
});
