import { userActionTypes } from '../../actionTypes';
import getUserByIdApi from '../../../api/users/getUserByIdApi';

export const getUserByIdAction = ({
  userId,
  onSuccess,
  onFailure,
}: {
  userId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: userActionTypes.getUserForId.request,
  payload: {
    apiMethod: getUserByIdApi,
    isAuthenticated: true,
    failureActionType: userActionTypes.getUserForId.failure,
    successActionType: userActionTypes.getUserForId.success,
    params: { userId },
    onSuccess,
    onFailure,
  },
});
