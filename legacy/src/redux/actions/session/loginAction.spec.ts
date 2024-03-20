import { loginActionTypes } from '../../actionTypes';
import loginApi from '../../../api/session/loginApi';
import { loginAction } from './loginAction';
import { testApiAction } from '../testUtils/testApiAction';

const params = {
  email: 'test@test.de',
  password: 'testtest',
} as any;

export const onAction = (): any => loginAction(params);

testApiAction({
  onAction,
  type: loginActionTypes.request,
  payload: {
    apiMethod: loginApi,
    isAuthenticated: false,
    failureActionType: loginActionTypes.failure,
    successActionType: loginActionTypes.success,
    params: {
      account: params,
    },
  },
});
