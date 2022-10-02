import { getBillingByRunIdAction } from './getBillingByRunIdAction';
import { getStripePortalUrlAction } from './getStripePortalUrlAction';
import { getPaymentMethodAction } from './getPaymentMethodAction';
import { updatePaymentMethodAction } from './updatePaymentMethodAction';
import { retryInvoiceAction } from './retryInvoiceAction';
import { getSubscriptionAction } from './getSubscriptionAction';
import { getOrganizationBillingAction } from './getOrganizationBillingAction';
import { updateSubscriptionAction } from './updateSubscriptionAction';

export const billingActions = {
  billingForRunId: getBillingByRunIdAction,
  getOrganizationBilling: getOrganizationBillingAction,
};

export const stripeActions = {
  getPortalUrl: getStripePortalUrlAction,
  getPaymentMethod: getPaymentMethodAction,
  getSubscription: getSubscriptionAction,
  updatePaymentMethod: updatePaymentMethodAction,
  updateSubscription: updateSubscriptionAction,
  retryInvoice: retryInvoiceAction,
};
