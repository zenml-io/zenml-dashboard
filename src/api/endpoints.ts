export const endpoints = {
  login: '/login',
  signup: (username: string): string => `/users/${username}/activate`,
  userEmail: (userId: string): string => `/users/${userId}/email-opt-in`,
  forgot: '/login/email/resetpassword',
  version: '/version',
  users: {
    me: '/current-user',
    get: (id: TId): string => `/users/${id}`,
    updateUser: (username: string): string => `/users/${username}`,
  },
  organizations: {
    my: '/organizations/',
    reGenerateToken: (username: string): string =>
      `/users/${username}/deactivate`,
    invites: '/organizations/invite?status=pending',
    owner: '/organizations/creator',
    members: '/users',
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
    get: (pipelineId: TId): string => `/pipelines/${pipelineId}&hydrated=true`,
  },
  Stacks: {
    my: '/stacks?hydrated=true',
    get: (stackId: TId): string => `/Stacks/${stackId}&hydrated=true`,
  },
  StackComponents: {
    types: '/component-types',
    my: (type: string): string => `/components?type=${type}&hydrated=true`,
    get: (stackComponentId: TId): string =>
      `/components/${stackComponentId}?hydrated=true`,
  },
  runs: {
    pipeline: {
      get: (pipelineId: TId): string =>
        `/runs?pipeline_id=${pipelineId}&unlisted=false&hydrated=true`,
    },
    stack: {
      get: (stackId: TId): string =>
        `/runs?stack_id=${stackId}&unlisted=false&hydrated=true`,
    },
    stackComponent: {
      get: (stackComponentId: TId): string =>
        `/runs?component_id=${stackComponentId}&hydrated=true`,
    },
    graphById: {
      get: (runId: TId): string => `/runs/${runId}/graph`,
    },
    all: `/runs?unlisted=false&hydrated=true`,
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
