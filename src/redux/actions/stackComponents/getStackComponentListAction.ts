import { stackComponentActionTypes } from '../../actionTypes';
import getStackComponentListApi from '../../../api/stackComponents/getStackComponentListApi';

export const getStackComponentListAction = ({
  type,
  onSuccess,
  onFailure,
}: {
  type: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: stackComponentActionTypes.getStackComponentList.request,
  payload: {
    apiMethod: getStackComponentListApi,
    isAuthenticated: true,
    failureActionType: stackComponentActionTypes.getStackComponentList.failure,
    successActionType: stackComponentActionTypes.getStackComponentList.success,
    params: { type },
    onSuccess,
    onFailure,
  },
});
