import { stackActionTypes } from '../../actionTypes';
import getAllRunsByStackComponentIdApi from '../../../api/stackComponents/getAllRunsByStackComponentIdApi';

export const getAllRunsByStackComponentId = ({
  stackId,
  onSuccess,
  onFailure,
}: {
  stackId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => {
  return {
    type: stackActionTypes.getRunsByStackId.request,
    payload: {
      apiMethod: getAllRunsByStackComponentIdApi,
      isAuthenticated: true,
      failureActionType: stackActionTypes.getRunsByStackId.failure,
      successActionType: stackActionTypes.getRunsByStackId.success,
      params: { stackId },
      onSuccess,
      onFailure,
    },
  };
};
