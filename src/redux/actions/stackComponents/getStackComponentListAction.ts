import { stackComponentActionTypes } from '../../actionTypes';
import getStackComponentListApi from '../../../api/stackComponents/getStackComponentListApi';

export const getStackComponentListAction = ({
  workspace,
  sort_by,
  logical_operator,
  type,
  index,
  max_size,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  workspace: string;
  sort_by: string;
  logical_operator: string;
  type: TId;
  index: number;
  max_size: number;
  filtersParam?: object;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stackComponentActionTypes.getStackComponentList.request,
  payload: {
    apiMethod: getStackComponentListApi,
    isAuthenticated: true,
    failureActionType: stackComponentActionTypes.getStackComponentList.failure,
    successActionType: stackComponentActionTypes.getStackComponentList.success,
    params: {
      type,
      sort_by,
      logical_operator,
      workspace,
      index,
      max_size,
      filtersParam,
    },
    onSuccess,
    onFailure,
  },
});
