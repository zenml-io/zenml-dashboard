import { organizationActionTypes } from '../../actionTypes';
import getMyOrganizationApi from '../../../api/organizations/getMyOrganizationApi';

export const getMyOrganizationAction = (): TRequestAction => ({
  type: organizationActionTypes.getMyOrganization.request,
  payload: {
    apiMethod: getMyOrganizationApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getMyOrganization.failure,
    successActionType: organizationActionTypes.getMyOrganization.success,
  },
});
