import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const billingActionTypes = {
  getBillingForRunId: generateApiActionsTypes(
    actionTypes.BILLING_GET_BILLING_FOR_RUN_ID,
  ),
  getOrganizationBilling: generateApiActionsTypes(
    actionTypes.BILLING_GET_ORGANIZATION_BILLING,
  ),
};
