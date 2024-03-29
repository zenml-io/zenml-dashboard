import { stackComponentActionTypes } from '../../actionTypes';
import getStackComponentListApi from '../../../api/stackComponents/getStackComponentListApi';

export const getStackComponentListAction = ({
  workspace,
  sort_by,
  logical_operator,
  type,
  page,
  size,
  filtersParam,
  id,
  onSuccess,
  onFailure,
}: {
  workspace: string;
  sort_by?: string;
  logical_operator?: string;
  type: TId;
  page: number;
  size: number;
  filtersParam?: object;
  id?: any;
  onSuccess?: (res: any) => void;
  onFailure?: (res: any) => void;
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
      page,
      size,
      filtersParam,
      id,
    },
    onSuccess,
    onFailure,
  },
});
