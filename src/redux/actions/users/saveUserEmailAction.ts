import { userActionTypes } from '../../actionTypes';
import saveUserEmailApi from '../../../api/session/saveUserEmail';

export const SaveUserEmailAction = ({
  userId,
  email,
  email_opted_in,
  onSuccess,
  onFailure,
}: {
  userId: TId;
  email: string;
  email_opted_in: any;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: userActionTypes.saveUserEmail.request,
  payload: {
    apiMethod: saveUserEmailApi,
    isAuthenticated: true,
    failureActionType: userActionTypes.saveUserEmail.failure,
    successActionType: userActionTypes.saveUserEmail.success,
    params: { email, email_opted_in, userId },
    onSuccess,
    onFailure,
  },
});
