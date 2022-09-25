import { stackActionTypes } from '../../actionTypes';
import getMyStacksApi from '../../../api/stacks/getMyStacksApi';

export const getMyStacksAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stackActionTypes.getMyStacks.request,
  payload: {
    apiMethod: getMyStacksApi,
    isAuthenticated: true,
    failureActionType: stackActionTypes.getMyStacks.failure,
    successActionType: stackActionTypes.getMyStacks.success,
    onSuccess,
    onFailure,
  },
});
