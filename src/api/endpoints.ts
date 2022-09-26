export const endpoints = {
  login: '/login',
  signup: (username: string): string => `/users/${username}/activate`,
  forgot: '/login/email/resetpassword',
  users: {
    me: '/users/me',
    get: (id: TId): string => `/users/${id}`,
    updateUser: (id: string): string => `/users/${id}`,
  },
  organizations: {
    my: '/organizations/',
    reGenerateToken: (username: string): string =>
      `/users/${username}/deactivate`,
    invites: '/organizations/invite?status=pending',
    owner: '/organizations/creator',
    members: '/organizations/users',
    roles: '/organizations/roles',
    invite: '/users',
    deleteInvite: (id: string): string => `/users/${id}`,
    getInvoices: `/billing/organization/invoices`,
  },
  workspaces: {
    my: '/workspaces/',
    pipelinesForId: (id: TId): string => `/workspaces/${id}/pipelines`,
  },
  pipelines: {
    my: '/pipelines?hydrated=true',
    get: (pipelineId: TId): string => `/pipelines/${pipelineId}`,
  },
  Stacks: {
    my: '/stacks',
    get: (stackId: TId): string => `/Stacks/${stackId}`,
  },
  StackComponents: {
    types: '/component-types',
    components: {
      my: (type: string): string => `/components?type=${type}`,
      get: (stackId: TId): string => `/Stacks/${stackId}`,
    },
    my: '/Stacks/',
    get: (stackId: TId): string => `/Stacks/${stackId}`,
  },
  runs: {
    pipeline: {
      get: (pipelineId: TId): string =>
        `/runs?pipeine_id=${pipelineId}?hydrated=true`,
    },
    stack: {
      get: (stackId: TId): string =>
        `/runs?stack_id=${stackId}&unlisted=false&hydrated=true`,
    },
    stackComponent: {
      get: (stackComponentId: TId): string =>
        `/runs?component_id=${stackComponentId}?hydrated=true`,
    },
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
