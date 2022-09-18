import { stackComponentActionTypes } from '../../actionTypes';
import getStackComponentTypesApi from '../../../api/stackComponents/getStackComponentTypesApi';

export const getStackComponentTypesAction = (): TRequestAction => ({
  type: stackComponentActionTypes.getStackComponentTypes.request,
  payload: {
    apiMethod: getStackComponentTypesApi,
    isAuthenticated: true,
    failureActionType: stackComponentActionTypes.getStackComponentTypes.failure,
    successActionType: stackComponentActionTypes.getStackComponentTypes.success,
  },
});
