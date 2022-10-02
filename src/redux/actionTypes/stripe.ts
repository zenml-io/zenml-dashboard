import { actionTypes } from './constants';
import { generateApiActionsTypes } from './generateApiActionsTypes';

export const stripeActionTypes = {
  getStripePortalUrl: generateApiActionsTypes(
    actionTypes.STRIPE_GET_PORTAL_URL,
  ),
  getPaymentMethod: generateApiActionsTypes(
    actionTypes.STRIPE_GET_PAYMENT_METHOD,
  ),
  updatePaymentMethod: generateApiActionsTypes(
    actionTypes.STRIPE_UPDATE_PAYMENT_METHOD,
  ),
  updateSubscription: generateApiActionsTypes(
    actionTypes.STRIPE_UPDATE_SUBSCRIPTION,
  ),
  getSubscription: generateApiActionsTypes(actionTypes.STRIPE_GET_SUBSCRIPTION),
};
