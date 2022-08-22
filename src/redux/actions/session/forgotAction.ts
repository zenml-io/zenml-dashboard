import { forgotActionTypes } from '../../actionTypes';
import forgotApi from '../../../api/session/forgotApi';

export const forgotAction = ({
  email,
  onSuccess,
  onFailure,
}: {
  email: string;
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: forgotActionTypes.request,
  payload: {
    apiMethod: forgotApi,
    isAuthenticated: false,
    failureActionType: forgotActionTypes.failure,
    successActionType: forgotActionTypes.success,
    onSuccess,
    onFailure,
    params: {
      account: {
        email,
      },
    },
  },
});
