export const routePaths = {
  login: '/login',
  signup: '/signup',
  userEmail: `/user-email`,
  forgot: '/forgot-password',
  home: `/`,
  devices: {
    verify: '/devices/verify',
  },
  dashboard: (workspace: string): string => `/workspaces/${workspace}`,
  pipelines: {
    base: `/pipelines`,
    list: (workspace: string): string =>
      `/workspaces/${workspace}/pipelines/list`,
    allRuns: (workspace: string): string => `/workspaces/${workspace}/all-runs`,
  },
  pipeline: {
    base: (id: TId): string => `/pipelines/${id}`,
    configuration: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/pipelines/${id}/configuration`,
    runs: (workspace: string, id: TId): string =>
      `/workspaces/${workspace}/pipelines/${id}/runs`,
  },
  repositories: {
    list: (workspace: string): string =>
      `/workspaces/${workspace}/repositories/list`,
    overview: (workspace: string, repositoryID: string): string =>
      `/workspaces/${workspace}/repositories/${repositoryID}/overview`,
    runs: (workspace: string, repositoryID: string): string =>
      `/workspaces/${workspace}/repositories/${repositoryID}/runs`,
    create: (workspace: string): string =>
      `/workspaces/${workspace}/repositories/create`,
  },
  run: {
    pipeline: {
      base: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}`,
      statistics: (workspace: string, id: TId, pipelineId: TId): string =>
        `/workspaces/${workspace}/pipelines/${pipelineId}/runs/${id}/dag`,
      results: (workspace: string, id: TId, pipelineId: TId): string =>
        `/workspaces/${workspace}/pipelines/${pipelineId}/runs/${id}/configuration`,
      details: (workspace: string, id: TId, pipelineId: TId): string =>
        `/workspaces/${workspace}/pipelines/${pipelineId}/runs/${id}/details`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/pipelines/${pipelineId}/runs/${id}/tensorboard`,
    },
    repository: {
      base: (id: TId, repositoryID: TId): string =>
        `/repositories/${repositoryID}/runs/${id}`,
      statistics: (workspace: string, id: TId, repositoryID: TId): string =>
        `/workspaces/${workspace}/repositories/${repositoryID}/runs/${id}/dag`,
      results: (workspace: string, id: TId, repositoryID: TId): string =>
        `/workspaces/${workspace}/repositories/${repositoryID}/runs/${id}/configuration`,
      details: (workspace: string, id: TId, repositoryID: TId): string =>
        `/workspaces/${workspace}/repositories/${repositoryID}/runs/${id}/details`,
      tensorboard: (id: TId, repositoryID: TId): string =>
        `/repositories/${repositoryID}/runs/${id}/tensorboard`,
    },
    stack: {
      base: (id: TId, pipelineId: TId): string =>
        `/stacks/${pipelineId}/runs/${id}`,
      statistics: (workspace: string, id: TId, stackId: TId): string =>
        `/workspaces/${workspace}/stacks/${stackId}/runs/${id}/dag`,
      results: (workspace: string, id: TId, stackId: TId): string =>
        `/workspaces/${workspace}/stacks/${stackId}/runs/${id}/configuration`,
      details: (workspace: string, id: TId, stackId: TId): string =>
        `/workspaces/${workspace}/stacks/${stackId}/runs/${id}/details`,
      tensorboard: (id: TId, stackId: TId): string =>
        `/stacks/${stackId}/runs/${id}/tensorboard`,
    },
    component: {
      base: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}`,
      statistics: (
        type: string,
        stackComponentId: TId,
        id: TId,
        workspace: string,
      ): string =>
        `/workspaces/${workspace}/components/${type}/${stackComponentId}/runs/${id}/dag`,
      results: (
        type: string,
        stackComponentId: TId,
        id: TId,
        workspace: string,
      ): string =>
        `/workspaces/${workspace}/components/${type}/${stackComponentId}/runs/${id}/results`,
      tensorboard: (id: TId, pipelineId: TId): string =>
        `/components/${pipelineId}/runs/${id}/tensorboard`,
    },
    run: {
      list: (workspace: string): string => `/workspaces/${workspace}/all-runs`,
      base: (runId: TId): string => `/all-runs/${runId}`,
      statistics: (workspace: string, id: TId, type?: string): string =>
        `/workspaces/${workspace}/all-runs/${id}/dag`,
      results: (workspace: string, runId: TId): string =>
        `/workspaces/${workspace}/all-runs/${runId}/configuration`,
      details: (workspace: string, runId: TId): string =>
        `/workspaces/${workspace}/all-runs/${runId}/details`,
      tensorboard: (runId: TId): string => `/runs/${runId}/tensorboard`,
    },
  },
  stacks: {
    base: '/stacks',
    list: (workspace: string): string => `/workspaces/${workspace}/stacks/list`,
    allRuns: '/stacks/all-runs',
    createStack: (workspace: string): string =>
      `/workspaces/${workspace}/create-stack/all-component`,
    UpdateStack: (workspace: string, id: TId): string =>
      `/workspaces/${workspace}/stack/${id}/update-stack`,
  },
  secrets: {
    base: '/secrets',
    list: (workspace: string): string =>
      `/workspaces/${workspace}/secrets/list`,

    registerSecrets: (workspace: string): string =>
      `/workspaces/${workspace}/secrets/register-secret`,
  },
  secret: {
    base: (id: TId): string => `/secrets/${id}`,
    configuration: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/secrets/${id}/configuration`,
    updateSecret: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/secrets/${id}/update-secret`,
    metaData: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/secrets/${id}/metadata`,
  },
  stack: {
    base: (id: TId): string => `/stacks/${id}`,
    configuration: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/stacks/${id}/configuration`,
    runs: (workspace: string, id: TId): string =>
      `/workspaces/${workspace}/stacks/${id}/runs`,
    components: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/stacks/${id}/component`,
  },
  runs: {
    base: (id: TId): string => `/stacks/${id}`,
    configuration: (id: TId): string => `/runs/${id}/configuration`,
    runs: (id: TId): string => `/stacks/${id}/runs`,
  },

  stackComponents: {
    base: (type: string, workspace: string): string =>
      `/workspaces/${workspace}/components/${type}`,
    configuration: (type: string, id: TId, workspace: string): string =>
      `/workspaces/${workspace}/components/${type}/${id}/configuration`,
    runs: (type: string, id: TId, workspace: string): string =>
      `/workspaces/${workspace}/components/${type}/${id}/runs`,
    stacks: (type: string, id: TId, workspace: string): string =>
      `/workspaces/${workspace}/components/${type}/${id}/stacks`,
    registerComponents: (type: string, workspace: string): string =>
      `/workspaces/${workspace}/register-components/${type}`,
    configureComponent: (type: string, workspace: string, id: string): string =>
      `/workspaces/${workspace}/register-components/${type}/${id}/configuration`,
    updateComponent: (type: string, id: string, workspace: string): string =>
      `/workspaces/${workspace}/components/${type}/${id}/update-component`,
  },

  plugins: {
    list: (workspace: string): string => `/workspaces/${workspace}/plugins`,
    create: (workspace: string): string =>
      `/workspaces/${workspace}/plugins/create`,
    buildLogs: (workspace: string, pluginVersionID: TId): string =>
      `/workspaces/${workspace}/plugin-version/${pluginVersionID}/build-logs`,
    detail: {
      base: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}`,
      overview: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}/overview`,
      changelogs: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}/changelogs`,
      requirements: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}/requirements`,
      usage: (workspace: string, plugin: TId): string =>
        `/workspaces/${workspace}/plugins/${plugin}/usage`,
    },
    update: (workspace: string, id: TId): string =>
      `/workspaces/${workspace}/plugins/${id}/update`,
  },

  connectors: {
    base: '/connectors',
    list: (workspace: string): string =>
      `/workspaces/${workspace}/connectors/list`,
    connectorTypes: (workspace: string): string =>
      `/workspaces/${workspace}/connector-types`,
    registerConnectors: (type: string, workspace: string): string =>
      `/workspaces/${workspace}/${type}/register-connector`,

    configuration: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/connectors/${id}/configuration`,
    updateConnector: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/connectors/${id}/update-connector`,
    connectorComponents: (id: TId, workspace: string): string =>
      `/workspaces/${workspace}/connectors/${id}/components`,
  },

  settings: {
    base: '/settings',
    personalDetails: '/settings/personal-details',
    organizationSettings: '/settings/organization',
    starredPlugins: '/settings/starred-plugins',
    myPlugins: '/settings/my-plugins',
  },
  logout: '/logout',
};
