// const url_string = window.location.href;
// const url = new URL(url_string);
// const projectName = url.searchParams.get('project');

export const routePaths = {
  login: '/login',
  signup: '/signup',
  userEmail: `/user-email`,
  forgot: '/forgot-password',
  home: (project: string): string => `/projects/${project}`,
  pipelines: {
    base: `/pipelines`,
    list: (project: string): string => `/projects/${project}/pipelines/list`,
    allRuns: (project: string): string => `/projects/${project}/all-runs`,
  },
  pipeline: {
    base: (id: TId): string => `/pipelines/${id}`,
    configuration: (id: TId, project: string): string =>
      `/projects/${project}/pipelines/${id}/configuration`,
    runs: (project: string, id: TId): string =>
      `/projects/${project}/pipelines/${id}/runs`,
  },
  run: {
    pipeline: {
      base: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}`,
      statistics: (project: string, id: TId, pipelineId: TId): string =>
        `/projects/${project}/pipelines/${pipelineId}/runs/${id}/dag`,
      results: (project: string, id: TId, pipelineId: TId): string =>
        `/projects/${project}/pipelines/${pipelineId}/runs/${id}/configuration`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}/tensorboard`,
    },
    stack: {
      base: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}`,
      statistics: (project: string, id: TId, stackId: TId): string =>
        `/projects/${project}/stacks/${stackId}/runs/${id}/dag`,
      results: (project: string, id: TId, pipelineId: TId): string =>
        `/projects/${project}/stacks/${pipelineId}/runs/${id}/configuration`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}/tensorboard`,
    },
    component: {
      base: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}`,
      statistics: (
        type: string,
        stackComponentId: TId,
        id: TId,
        project: string,
      ): string =>
        `/projects/${project}/components/${type}/${stackComponentId}/runs/${id}/dag`,
      results: (
        type: string,
        stackComponentId: TId,
        id: TId,
        project: string,
      ): string =>
        `/projects/${project}/components/${type}/${stackComponentId}/runs/${id}/results`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}/tensorboard`,
    },
    run: {
      base: (runId: TId): string => `/all-runs/${runId}`,
      statistics: (project: string, id: TId, type?: string): string =>
        `/projects/${project}/all-runs/${id}/dag`,
      results: (project: string, runId: TId): string =>
        `/projects/${project}/all-runs/${runId}/configuration`,
      tensorboard: (runId: TId): string => `/runs/${runId}/tensorboard`,
    },
  },
  stacks: {
    base: '/stacks',
    list: (project: string): string => `/projects/${project}/stacks/list`,
    allRuns: '/stacks/all-runs',
  },
  stack: {
    base: (id: TId): string => `/stacks/${id}`,
    configuration: (id: TId, project: string): string =>
      `/projects/${project}/stacks/${id}/configuration`,
    runs: (project: string, id: TId): string =>
      `/projects/${project}/stacks/${id}/runs`,
  },
  runs: {
    base: (id: TId): string => `/stacks/${id}`,
    configuration: (id: TId): string => `/runs/${id}/configuration`,
    runs: (id: TId): string => `/stacks/${id}/runs`,
  },

  stackComponents: {
    base: (type: string, project: string): string =>
      `/projects/${project}/components/${type}`,
    configuration: (type: string, id: TId, project: string): string =>
      `/projects/${project}/components/${type}/${id}/configuration`,
    runs: (type: string, id: TId, project: string): string =>
      `/projects/${project}/components/${type}/${id}/runs`,
  },

  settings: {
    base: '/settings',
    personalDetails: '/settings/personal-details',
    organizationSettings: '/settings/organization',
  },
  logout: '/logout',
};
