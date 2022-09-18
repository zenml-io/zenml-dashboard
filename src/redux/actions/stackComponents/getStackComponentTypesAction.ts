import { stackActionTypes } from '../../actionTypes';
import getStackComponentTypesApi from '../../../api/stackComponents/getStackComponentTypesApi';

export const getStackComponentTypesAction = (): TRequestAction => ({
  type: stackActionTypes.getMyStacks.request,
  payload: {
    apiMethod: getStackComponentTypesApi,
    isAuthenticated: true,
    failureActionType: stackActionTypes.getMyStacks.failure,
    successActionType: stackActionTypes.getMyStacks.success,
  },
});
