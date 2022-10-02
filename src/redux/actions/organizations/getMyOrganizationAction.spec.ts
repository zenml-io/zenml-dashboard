import { organizationActionTypes } from '../../actionTypes';
import getMyOrganizationApi from '../../../api/organizations/getMyOrganizationApi';
import { getMyOrganizationAction } from './getMyOrganizationAction';
import { testApiAction } from '../testUtils/testApiAction';

export const onAction = (): any => getMyOrganizationAction();

testApiAction({
  onAction,
  type: organizationActionTypes.getMyOrganization.request,
  payload: {
    apiMethod: getMyOrganizationApi,
    isAuthenticated: true,
    failureActionType: organizationActionTypes.getMyOrganization.failure,
    successActionType: organizationActionTypes.getMyOrganization.success,
  },
});
