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
    members: '/users',
    membersWithRole: '/role_assignments',
    invite: '/users',
    deleteInvite: (id: string): string => `/users/${id}`,
  },

  projects: {
    my: '/projects',
    stats: (project: string) => `/projects/${project}/statistics`,
  },

  pipelines: {
    my: (project: string): string => `/projects/${project}/pipelines`,
    get: (pipelineId: TId): string => `/pipelines/${pipelineId}`,
  },
  Stacks: {
    my: (project: string): string => `/projects/${project}/stacks`,
    get: (stackId: TId): string => `/stacks/${stackId}`,
  },
  StackComponents: {
    types: '/component-types',
    my: (type: string, project: string): string =>
      `/projects/${project}/components?type=${type}`,
    get: (stackComponentId: TId): string => `/components/${stackComponentId}`,
  },
  runs: {
    pipeline: {
      get: (pipelineId: TId): string => `/runs?pipeline_id=${pipelineId}`,
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
    all: (project: string): string => `/projects/${project}/runs`,
    get: (runId: TId): string => `/runs/${runId}`,
  },
  roles: {
    all: `/roles`,
  },
};
