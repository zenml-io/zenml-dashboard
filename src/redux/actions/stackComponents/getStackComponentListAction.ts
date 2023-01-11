import { stackComponentActionTypes } from '../../actionTypes';
import getStackComponentListApi from '../../../api/stackComponents/getStackComponentListApi';

export const getStackComponentListAction = ({
  project,
  type,
  page,
  size,
  filtersParam,
  onSuccess,
  onFailure,
}: {
  project: string;
  type: TId;
  page: number;
  size: number;
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
    params: { type, project, page, size, filtersParam },
    onSuccess,
    onFailure,
  },
});
