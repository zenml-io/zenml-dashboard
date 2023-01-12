import { stackComponentActionTypes } from '../../actionTypes';
import getAllRunsByStackComponentIdApi from '../../../api/stackComponents/getAllRunsByStackComponentIdApi';

export const getAllRunsByStackComponentId = ({
  stackComponentId,
  page,
  size,
  filtersParam,

  onSuccess,
  onFailure,
}: {
  page: number;
  size: number;
  filtersParam?: any;
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
      params: { stackComponentId, page, size, filtersParam },
      onSuccess,
      onFailure,
    },
  };
};
