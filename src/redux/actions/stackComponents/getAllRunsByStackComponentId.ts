import { stackComponentActionTypes } from '../../actionTypes';
import getAllRunsByStackComponentIdApi from '../../../api/stackComponents/getAllRunsByStackComponentIdApi';

export const getAllRunsByStackComponentId = ({
  stackComponentId,
  onSuccess,
  onFailure,
}: {
  stackComponentId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => {
  return {
    type: stackComponentActionTypes.getStackComponentForId.request,
    payload: {
      apiMethod: getAllRunsByStackComponentIdApi,
      isAuthenticated: true,
      failureActionType:
        stackComponentActionTypes.getRunsByStackComponentId.failure,
      successActionType:
        stackComponentActionTypes.getRunsByStackComponentId.success,
      params: { stackComponentId },
      onSuccess,
      onFailure,
    },
  };
};
