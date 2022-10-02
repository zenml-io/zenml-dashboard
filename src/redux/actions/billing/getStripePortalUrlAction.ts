import { stripeActionTypes } from '../../actionTypes';
import getStripePortalUrlApi from '../../../api/billing/getStripePortalUrlApi';

export const getStripePortalUrlAction = (): TRequestAction => ({
  type: stripeActionTypes.getStripePortalUrl.request,
  payload: {
    apiMethod: getStripePortalUrlApi,
    isAuthenticated: true,
    failureActionType: stripeActionTypes.getStripePortalUrl.failure,
    successActionType: stripeActionTypes.getStripePortalUrl.success,
  },
});
