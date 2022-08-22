import { organizationActionTypes } from '../../actionTypes';
import getRolesApi from '../../../api/organizations/getRolesApi';

export const getRolesAction = (): TRequestAction => ({
  type: organizationActionTypes.getRoles.request,
  payload: {
    apiMethod: getRolesApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getRoles.failure,
    successActionType: organizationActionTypes.getRoles.success,
  },
});
