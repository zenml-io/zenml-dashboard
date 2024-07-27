export const apiPaths = {
	login: "/login",
	activate: "/activate",
	logout: "/logout",
	currentUser: "/current-user",
	info: "/info",
	settings: "/settings",
	pipelines: {
		namespaces: "/pipeline_namespaces"
	},
	artifactVersions: {
		detail: (versionId: string) => `/artifact_versions/${versionId}`,
		visualize: (versionId: string) => `/artifact_versions/${versionId}/visualize`
	},
	components: {
		detail: (componentId: string) => `/components/${componentId}`
	},
	devices: {
		detail: (deviceId: string) => `/devices/${deviceId}`,
		verify: (deviceId: string) => `/devices/${deviceId}/verify`
	},
	runs: {
		all: "/runs",
		detail: (id: string) => `/runs/${id}`,
		graph: (runId: string) => `/runs/${runId}/graph`
	},
	pipeline_builds: {
		all: "/pipeline_builds",
		detail: (runId: string) => `/pipeline_builds/${runId}`
	},
	code_repositories: {
		all: "/code_repositories",
		detail: (codeRepositoryId: string) => `/code_repositories/${codeRepositoryId}`
	},
	stackDeployment: {
		info: "/stack-deployment/info",
		url: "/stack-deployment/url",
		stack: "/stack-deployment/stack"
	},
	stacks: {
		all: "/stacks",
		detail: (stackId: string) => `/stacks/${stackId}`
	},
	steps: {
		detail: (stepId: string) => `/steps/${stepId}`,
		logs: (stepId: string) => `/steps/${stepId}/logs`
	},
	users: {
		all: "/users",
		detail: (userId: string) => `/users/${userId}`,
		activate: (userId: string) => `/users/${userId}/activate`
	},
	secrets: {
		all: "/secrets",
		detail: (secretId: string) => `/secrets/${secretId}`,
		add: (workspaceId: string) => `/workspaces/${workspaceId}/secrets`
	},
	workspaces: {
		detail: (workspaceName: string) => `/workspaces/${workspaceName}`
	}
};

export function createApiPath(path: string) {
	return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}
