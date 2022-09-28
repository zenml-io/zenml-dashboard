export const routePaths = {
  login: '/login',
  signup: '/signup',
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
        `/pipelines/${pipelineId}/runs/${id}/statistics`,
      results: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}/results`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}/tensorboard`,
    },
    stack: {
      base: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}`,
      statistics: (id: TId, stackId: TId): string =>
        `/stacks/${stackId}/runs/${id}/statistics`,
      results: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}/results`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}/tensorboard`,
    },
    component: {
      base: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}`,
      statistics: (type: string, id: TId, pipelineId: TId): string =>
        `/components/${type}/runs/${id}/statistics`,
      results: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}/results`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}/tensorboard`,
    },
    run: {
      base: (runId: TId): string => `/runs/${runId}`,
      statistics: (id: TId, type?: string): string => `/runs/${id}/statistics`,
      results: (runId: TId): string => `/runs/${runId}/results`,
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
  datasources: '/datasources',
  functions: '/functions',
  models: '/models',
  deployments: '/deployments',
  settings: {
    base: '/settings',
    personalDetails: '/settings/personal-details',
    yourPlan: '/settings/plan',
    billing: '/settings/billing',
    organizationSettings: '/settings/organization',
  },
};
