import { userActionTypes } from '../../actionTypes';
import getMyUserApi from '../../../api/users/getMyUserApi';
import { getMyUserAction } from './getMyUserAction';
import { testApiAction } from '../testUtils/testApiAction';

export const onAction = (): any => getMyUserAction();

testApiAction({
  onAction,
  type: userActionTypes.getMyUser.request,
  payload: {
    apiMethod: getMyUserApi,
    isAuthenticated: true,
    failureActionType: userActionTypes.getMyUser.failure,
    successActionType: userActionTypes.getMyUser.success,
  },
});
