import getOrganizationBillingApi from '../../../api/billing/getOrganizationBillingApi';
import { billingActionTypes } from '../../actionTypes/billing';

export const getOrganizationBillingAction = ({
  onSuccess,
  onFailure,
}: {
  onSuccess?: () => void;
  onFailure?: () => void;
}): TRequestAction => ({
  type: billingActionTypes.getOrganizationBilling.request,
  payload: {
    apiMethod: getOrganizationBillingApi,
    isAuthenticated: true,
    failureActionType: billingActionTypes.getOrganizationBilling.failure,
    successActionType: billingActionTypes.getOrganizationBilling.success,
    onSuccess,
    onFailure,
  },
});
