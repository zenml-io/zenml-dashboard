import { stackActionTypes } from '../../actionTypes';
import getMyStacksApi from '../../../api/stacks/getMyStacksApi';

export const getMyStacksAction = ({
  project,
  onSuccess,
  onFailure,
}: {
  project: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stackActionTypes.getMyStacks.request,
  payload: {
    apiMethod: getMyStacksApi,
    isAuthenticated: true,
    failureActionType: stackActionTypes.getMyStacks.failure,
    successActionType: stackActionTypes.getMyStacks.success,
    params: { project },
    onSuccess,
    onFailure,
  },
});
