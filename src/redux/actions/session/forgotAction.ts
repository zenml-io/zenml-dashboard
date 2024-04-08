import { forgotActionTypes } from '../../actionTypes';
import forgotApi from '../../../api/session/forgotApi';

export const forgotAction = ({
  userId,
  password,
  old_password,
  onSuccess,
  onFailure,
}: {
  userId: string;
  password: string;
  old_password: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: forgotActionTypes.request,
  payload: {
    apiMethod: forgotApi,
    isAuthenticated: true,
    failureActionType: forgotActionTypes.failure,
    successActionType: forgotActionTypes.success,
    onSuccess,
    onFailure,
    params: {
      userId,
      password,
      old_password,
    },
  },
});
