import { userActionTypes } from '../../actionTypes';
import saveUserEmailApi from '../../../api/session/saveUserEmail';

export const SaveUserEmailAction = ({
  userId,
  email,
  onSuccess,
  onFailure,
}: {
  userId: TId;
  email: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: userActionTypes.updateUserEmail.request,
  payload: {
    apiMethod: saveUserEmailApi,
    isAuthenticated: false,
    failureActionType: userActionTypes.updateUserEmail.failure,
    successActionType: userActionTypes.updateUserEmail.success,
    params: { email, userId },
    onSuccess,
    onFailure,
  },
});
