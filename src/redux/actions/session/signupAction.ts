import { signupActionTypes } from '../../actionTypes';
import signUpApi from '../../../api/session/signUpApi';

export const signUpAction = ({
  password,
  email,
  onSuccess,
  onFailure,
}: {
  password: string;
  email: string;
  onSuccess?: () => void;
  onFailure?: (errorMessage: string) => void;
}): TRequestAction => ({
  type: signupActionTypes.request,
  payload: {
    apiMethod: signUpApi,
    isAuthenticated: false,
    failureActionType: signupActionTypes.failure,
    successActionType: signupActionTypes.success,
    onSuccess,
    onFailure,
    params: {
      account: {
        email,
        password
      },
    },
  },
});
