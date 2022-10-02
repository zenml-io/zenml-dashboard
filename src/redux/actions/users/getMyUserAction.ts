import { userActionTypes } from '../../actionTypes';
import getMyUserApi from '../../../api/users/getMyUserApi';

export const getMyUserAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: userActionTypes.getMyUser.request,
  payload: {
    apiMethod: getMyUserApi,
    isAuthenticated: true,
    failureActionType: userActionTypes.getMyUser.failure,
    successActionType: userActionTypes.getMyUser.success,
    onSuccess,
    onFailure,
  },
});
