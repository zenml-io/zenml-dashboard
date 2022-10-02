import { signupActionTypes } from '../../actionTypes';
import signUpApi from '../../../api/session/signUpApi';

export const signUpAction = ({
  userId,
  username,
  email,
  fullName,
  password,
  token,
  onSuccess,
  onFailure,
}: {
  userId: string;
  username: string;
  email: string;
  fullName: string;
  password: string;
  token: any;
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
        userId,
        username,
        email,
        fullName,
        password,
        token,    
      },
    },
  },
});
