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
    base: (id: TId, pipelineId: TId): string =>
      `/pipelines/${pipelineId}/runs/${id}`,
    statistics: (id: TId, pipelineId: TId): string =>
      `/pipelines/${pipelineId}/runs/${id}/statistics`,
    results: (id: TId, pipelineId: TId): string =>
      `/pipelines/${pipelineId}/runs/${id}/results`,
    tensorboard: (id: TId, pipelineId: TId): string =>
      `/pipelines/${pipelineId}/runs/${id}/tensorboard`,
  },
  workspaces: {
    base: '/workspaces',
    list: '/workspaces/list',
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
