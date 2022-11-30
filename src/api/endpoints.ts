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
    invite: '/users',
    deleteInvite: (id: string): string => `/users/${id}`,
  },

  projects: {
    my: '/projects',
  },

  pipelines: {
    my: (project: string): string =>
      `/projects/${project}/pipelines?hydrated=true`,
    get: (pipelineId: TId): string =>
      `/pipelines/${pipelineId}?unlisted=false&hydrated=true`,
  },
  Stacks: {
    my: (project: string): string =>
      `/projects/${project}/stacks?hydrated=true`,
    get: (stackId: TId): string =>
      `/stacks/${stackId}?unlisted=false&hydrated=true`,
  },
  StackComponents: {
    types: '/component-types',
    my: (type: string, project: string): string =>
      `/projects/${project}/components?type=${type}&hydrated=true`,
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
        `/runs?component_id=${stackComponentId}&unlisted=false&hydrated=true`,
    },
    graphById: {
      get: (runId: TId): string => `/runs/${runId}/graph`,
    },
    all: `/runs?unlisted=false&hydrated=true`,
    get: (runId: TId): string => `/runs/${runId}?unlisted=false&hydrated=true`,
  },
  roles: {
    all: `/roles`,
  },
};
