import { stackActionTypes } from '../../actionTypes';
import getAllRunsByStackIdApi from '../../../api/stacks/getAllRunsByStackIdApi';

export const getAllRunsByStackId = ({
  stackId,
  page,
  size,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  page: number;
  size: number;
  filtersParam?: any;
  stackId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => {
  return {
    type: stackActionTypes.getRunsByStackId.request,
    payload: {
      apiMethod: getAllRunsByStackIdApi,
      isAuthenticated: true,
      failureActionType: stackActionTypes.getRunsByStackId.failure,
      successActionType: stackActionTypes.getRunsByStackId.success,
      params: { stackId, page, size, filtersParam },
      onSuccess,
      onFailure,
    },
  };
};
