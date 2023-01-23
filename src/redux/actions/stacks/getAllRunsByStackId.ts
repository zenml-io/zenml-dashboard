import { stackActionTypes } from '../../actionTypes';
import getAllRunsByStackIdApi from '../../../api/stacks/getAllRunsByStackIdApi';

export const getAllRunsByStackId = ({
  stackId,
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
      params: { sort_by, logical_operator, stackId, page, size, filtersParam },
      onSuccess,
      onFailure,
    },
  };
};
