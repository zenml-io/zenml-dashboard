import { signupActionTypes } from '../../actionTypes';
import signUpApi from '../../../api/session/signUpApi';

export const signUpAction = ({
  password,
  email,
  fullname,
  organizationName,
  onSuccess,
  onFailure,
}: {
  password: string;
  email: string;
  fullname: string;
  organizationName: string;
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
        password,
        fullname,
        organizationName,
      },
    },
  },
});
