import {
  loginActionTypes,
  userActionTypes,
  organizationActionTypes,
  workspaceActionTypes,
  pipelineActionTypes,
  runActionTypes,
  billingActionTypes,
  stripeActionTypes,
} from '../actionTypes';
import { actionTypesHandledByRequestSaga } from './actionTypesHandledByRequestSaga';

export const expectedActionTypes = [
  loginActionTypes.request,
  userActionTypes.getMyUser.request,
  userActionTypes.getUserForId.request,
  organizationActionTypes.getMyOrganization.request,
  organizationActionTypes.getInviteForCode.request,
  organizationActionTypes.getInvites.request,
  organizationActionTypes.getOwner.request,
  organizationActionTypes.getMembers.request,
  organizationActionTypes.getRoles.request,
  organizationActionTypes.invite.request,
  organizationActionTypes.deleteInvite.request,
  organizationActionTypes.getInvoices.request,
  organizationActionTypes.retryInvoice.request,
  workspaceActionTypes.getMyWorkspaces.request,
  workspaceActionTypes.getPipelinesForWorkspaceId.request,
  pipelineActionTypes.getMyPipelines.request,
  pipelineActionTypes.getPipelineForId.request,
  runActionTypes.getRunForId.request,
  billingActionTypes.getBillingForRunId.request,
  billingActionTypes.getOrganizationBilling.request,
  stripeActionTypes.getStripePortalUrl.request,
  stripeActionTypes.getPaymentMethod.request,
  stripeActionTypes.updatePaymentMethod.request,
  stripeActionTypes.updateSubscription.request,
  stripeActionTypes.getSubscription.request,
];

describe('saga reacts to action type:', () => {
  it('runs', () => {
    expect(actionTypesHandledByRequestSaga.sort()).toEqual(
      expectedActionTypes.sort(),
    );
  });
});
