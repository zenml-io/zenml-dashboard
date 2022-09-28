import { updateEmailTypes } from '../../actionTypes';
import emailUpdateApi from '../../../api/session/emailUpdate';

export const emailUpdateAction = ({
  userId,
  email,
  name,
  onSuccess,
  onFailure,
}: {
  userId: string;
  email: string;
  name: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: updateEmailTypes.request,
  payload: {
    apiMethod: emailUpdateApi,
    isAuthenticated: true,
    failureActionType: updateEmailTypes.failure,
    successActionType: updateEmailTypes.success,
    onSuccess,
    onFailure,
    params: { userId, email, name },
  },
});
