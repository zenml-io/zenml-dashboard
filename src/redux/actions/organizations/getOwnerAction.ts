import { organizationActionTypes } from '../../actionTypes';
import getOwnerApi from '../../../api/organizations/getOwnerApi';

export const getOwnerAction = (): TRequestAction => ({
  type: organizationActionTypes.getOwner.request,
  payload: {
    apiMethod: getOwnerApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getOwner.failure,
    successActionType: organizationActionTypes.getOwner.success,
  },
});
