import { loginActionTypes } from '../../actionTypes';
import loginApi from '../../../api/session/loginApi';

export const loginAction = ({
  password,
  email,
  onSuccess,
  onFailure,
}: {
  password: string;
  email: string;
  onSuccess?: () => void;
  onFailure?: (errorText: string) => void;
}): TRequestAction => ({
  type: loginActionTypes.request,
  payload: {
    apiMethod: loginApi,
    isAuthenticated: false,
    failureActionType: loginActionTypes.failure,
    successActionType: loginActionTypes.success,
    onSuccess,
    onFailure,
    params: {
      account: {
        email,
        password,
      },
    },
  },
});
