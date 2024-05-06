import { userActionTypes } from '../../actionTypes';
import updateUserEmailApi from '../../../api/users/updateUserEmailApi';

export const updateUserEmailAction = ({
  email,
  userId,
  onSuccess,
  onFailure,
}: {
  email: string;
  userId: TId;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: userActionTypes.updateUserEmail.request,
  payload: {
    apiMethod: updateUserEmailApi,
    isAuthenticated: true,
    failureActionType: userActionTypes.updateUserEmail.failure,
    successActionType: userActionTypes.updateUserEmail.success,
    params: { email, userId },
    onSuccess,
    onFailure,
  },
});
