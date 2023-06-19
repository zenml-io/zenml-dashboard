export const endpoints = {
  login: '/login',
  signup: (username: string): string => `/users/${username}/activate`,
  userEmail: (userId: string): string => `/users/${userId}/email-opt-in`,
  forgot: '/login/email/resetpassword',
  version: '/version',
  serverInfo: '/info',
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
    members: '/users',
    membersWithRole: '/role_assignments',
    invite: '/users',
    deleteInvite: (id: string): string => `/users/${id}`,
  },

  workspaces: {
    my: '/workspaces',
    stats: (workspace: string) => `/workspaces/${workspace}/statistics`,
  },

  pipelines: {
    my: (workspace: string): string => `/workspaces/${workspace}/pipelines`,
    get: (pipelineId: TId): string => `/pipelines/${pipelineId}`,
  },
  Stacks: {
    my: (workspace: string): string => `/workspaces/${workspace}/stacks`,
    get: (stackId: TId): string => `/stacks/${stackId}`,
  },
  Secrets: {
    my: `/secrets`,
    get: (secretId: TId): string => `/secrets/${secretId}`,
  },
  repositories: {
    getAll: (workspace: string) => `/workspaces/${workspace}/code_repositories`,
    getByID: (repositoryID: string) => `/code_repositories/${repositoryID}`,
  },
  StackComponents: {
    types: '/component-types',
    my: (type: string, workspace: string): string =>
      `/workspaces/${workspace}/components?scope_type=${type}`,
    get: (stackComponentId: TId): string => `/components/${stackComponentId}`,
  },
  flavors: {
    all: '/flavors?sort_by=type',
    type: `/flavors`,
    get: (stackComponentId: TId): string => `/components/${stackComponentId}`,
  },
  runs: {
    pipeline: {
      get: (pipelineId: TId): string => `/runs?pipeline_id=${pipelineId}`,
    },
    repository: {
      get: (repositoryId: TId): string =>
        `/runs?code_repository_id=${repositoryId}`,
    },
    stack: {
      get: (stackId: TId): string => `/runs?stack_id=${stackId}`,
    },
    stackComponent: {
      get: (stackComponentId: TId): string =>
        `/runs?component_id=${stackComponentId}`,
    },
    graphById: {
      get: (runId: TId): string => `/runs/${runId}/graph`,
    },
    artifact: {
      get: (exe_id: TId): string => `/artifacts/${exe_id}`,
    },
    artifactVisualization: {
      get: (id: TId): string => `/artifacts/${id}/visualize`,
    },
    step: {
      get: (exe_id: TId): string => `/steps/${exe_id}`,
    },
    all: (workspace: string): string => `/workspaces/${workspace}/runs`,
    get: (runId: TId): string => `/runs/${runId}`,
  },
  roles: {
    all: `/roles`,
  },
  Connectors: {
    my: (workspace: string): string =>
      `/workspaces/${workspace}/service_connectors`,
    get: (connectorId: TId): string => `/service_connectors/${connectorId}`,
    connectorsTypes: `/service_connector_types`,
    connectorComponents: `/components`,
  },
};
