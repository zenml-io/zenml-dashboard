export const routePaths = {
  login: '/login',
  signup: '/signup',
  // userEmail: (userId: TId): string => `/user-email/${userId}`,
  userEmail: `/user-email`,
  forgot: '/forgot-password',
  home: '/',
  pipelines: {
    base: '/pipelines',
    list: '/pipelines/list',
    allRuns: '/pipelines/all-runs',
  },
  pipeline: {
    base: (id: TId): string => `/pipelines/${id}`,
    configuration: (id: TId): string => `/pipelines/${id}/configuration`,
    runs: (id: TId): string => `/pipelines/${id}/runs`,
  },
  run: {
    pipeline: {
      base: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}`,
      statistics: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}/dag`,
      results: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}/configuration`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}/tensorboard`,
    },
    stack: {
      base: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}`,
      statistics: (id: TId, stackId: TId): string =>
        `/stacks/${stackId}/runs/${id}/dag`,
      results: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}/configuration`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}/tensorboard`,
    },
    component: {
      base: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}`,
      statistics: (type: string, stackComponentId: TId, id: TId): string =>
        `/components/${type}/${stackComponentId}/runs/${id}/dag`,
      results: (type: string, stackComponentId: TId, id: TId): string =>
        `/components/${type}/${stackComponentId}/runs/${id}/results`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}/tensorboard`,
    },
    run: {
      base: (runId: TId): string => `/runs/${runId}`,
      statistics: (id: TId, type?: string): string => `/runs/${id}/dag`,
      results: (runId: TId): string => `/runs/${runId}/configuration`,
      tensorboard: (runId: TId): string => `/runs/${runId}/tensorboard`,
    },
  },
  stacks: {
    base: '/stacks',
    list: '/stacks/list',
    allRuns: '/stacks/all-runs',
  },
  stack: {
    base: (id: TId): string => `/stacks/${id}`,
    configuration: (id: TId): string => `/stacks/${id}/configuration`,
    runs: (id: TId): string => `/stacks/${id}/runs`,
  },
  runs: {
    base: (id: TId): string => `/stacks/${id}`,
    configuration: (id: TId): string => `/runs/${id}/configuration`,
    runs: (id: TId): string => `/stacks/${id}/runs`,
  },

  workspaces: {
    base: '/workspaces',
    list: '/workspaces/list',
  },
  stackComponents: {
    base: (type: string): string => `/components/${type}`,
    configuration: (type: string, id: TId): string =>
      `/components/${type}/${id}/configuration`,
    runs: (type: string, id: TId): string => `/components/${type}/${id}/runs`,
    // list: (type: string): string => `/components/${type}`,
  },

  settings: {
    base: '/settings',
    personalDetails: '/settings/personal-details',
    yourPlan: '/settings/plan',
    billing: '/settings/billing',
    organizationSettings: '/settings/organization',
  },
};
