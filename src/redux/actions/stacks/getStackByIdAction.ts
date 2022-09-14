import { stackActionTypes } from '../../actionTypes';
import getStackByIdApi from '../../../api/stacks/getStackByIdApi';

export const getStackByIdAction = ({
  stackId,
  onSuccess,
  onFailure,
}: {
  stackId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stackActionTypes.getStackForId.request,
  payload: {
    apiMethod: getStackByIdApi,
    isAuthenticated: true,
    failureActionType: stackActionTypes.getStackForId.failure,
    successActionType: stackActionTypes.getStackForId.success,
    params: { stackId },
    onSuccess,
    onFailure,
  },
});
