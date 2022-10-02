import { getUserByIdAction } from './getUserByIdAction';
import { userActionTypes } from '../../actionTypes';
import getUserByIdApi from '../../../api/users/getUserByIdApi';

import { testApiAction } from '../testUtils/testApiAction';

const userId = 'userId';

const onSuccess = jest.fn();
const onFailure = jest.fn();

export const onAction = (): any =>
  getUserByIdAction({ userId, onSuccess, onFailure });

testApiAction({
  onAction,
  type: userActionTypes.getUserForId.request,
  payload: {
    apiMethod: getUserByIdApi,
    isAuthenticated: true,
    failureActionType: userActionTypes.getUserForId.failure,
    successActionType: userActionTypes.getUserForId.success,
    params: { userId },
    onSuccess,
    onFailure,
  },
});
