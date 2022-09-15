export const endpoints = {
  login: '/login',
  signup: '/users',
  forgot: '/login/email/resetpassword',
  users: {
    me: '/users/me',
    get: (id: TId): string => `/users/${id}`,
  },
  organizations: {
    my: '/organizations/',
    inviteForCode: (code: string): string => `/organizations/invite/${code}`,
    invites: '/organizations/invite?status=pending',
    owner: '/organizations/creator',
    members: '/organizations/users',
    roles: '/organizations/roles',
    // invite: '/organizations/invite',
    invite: '/users',
    deleteInvite: (id: string): string => `/organizations/invite/${id}`,
    getInvoices: `/billing/organization/invoices`,
  },
  workspaces: {
    my: '/workspaces/',
    pipelinesForId: (id: TId): string => `/workspaces/${id}/pipelines`,
  },
  pipelines: {
    my: '/pipelines/',
    get: (pipelineId: TId): string => `/pipelines/${pipelineId}`,
  },
  runs: {
    get: (pipelineId: TId, runId: TId): string =>
      `/pipelines/${pipelineId}/runs/${runId}`,
  },
  billing: {
    my: '/billing/stripe/session',
    getOrganizationBilling: '/billing/organization',
    getPaymentMethod: '/billing/organization/get-payment-method',
    getSubscription: '/billing/stripe/get-subscription',
    updatePaymentMethod: (id: TId): string =>
      `/billing/stripe/update-payment-method?payment_method_id=${id}`,
    updateSubscription: (id: TId): string =>
      `/billing/stripe/update-subscription?plan_type=${id}`,
    get: (pipelineId: TId, runId: TId): string =>
      `/billing/${pipelineId}/runs/${runId}`,
    retryInvoice: (invoiceId: TId, paymentMethodId: TId): string =>
      `/billing/stripe/retry-invoice?invoice_id=${invoiceId}&payment_method_id=${paymentMethodId}`,
  },
};
