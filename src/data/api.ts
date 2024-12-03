export const apiPaths = {
	login: "/login",
	activate: "/activate",
	logout: "/logout",
	currentUser: "/current-user",
	info: "/info",
	settings: "/settings",
	onboarding: "/onboarding_state",
	pipelines: {
		all: "/pipelines",
		detail: (pipelineId: string) => `/pipelines/${pipelineId}`
	},
	artifactVersions: {
		detail: (versionId: string) => `/artifact_versions/${versionId}`,
		visualize: (versionId: string) => `/artifact_versions/${versionId}/visualize`
	},
	components: {
		all: "/components",
		detail: (componentId: string) => `/components/${componentId}`
	},
	devices: {
		detail: (deviceId: string) => `/devices/${deviceId}`,
		verify: (deviceId: string) => `/devices/${deviceId}/verify`
	},
	runs: {
		all: "/runs",
		detail: (id: string) => `/runs/${id}`
	},
	pipeline_builds: {
		all: "/pipeline_builds",
		detail: (runId: string) => `/pipeline_builds/${runId}`
	},
	pipeline_deployments: {
		detail: (deploymentId: string) => `/pipeline_deployments/${deploymentId}`
	},
	code_repositories: {
		all: "/code_repositories",
		detail: (codeRepositoryId: string) => `/code_repositories/${codeRepositoryId}`
	},
	stackDeployment: {
		info: "/stack-deployment/info",
		config: "/stack-deployment/config",
		stack: "/stack-deployment/stack"
	},
	stacks: {
		all: "/stacks",
		detail: (stackId: string) => `/stacks/${stackId}`
	},
	flavors: {
		all: "/flavors"
	},
	serviceConnectors: {
		fullStackResources: "/service_connectors/full_stack_resources",
		types: {
			detail: (connectorType: string) => `/service_connector_types/${connectorType}`
		}
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
		detail: (workspaceName: string) => `/workspaces/${workspaceName}`,
		fullStack: (workspaceId: string) => `/workspaces/${workspaceId}/full-stack`,
		stacks: (workspaceId: string) => `/workspaces/${workspaceId}/stacks`
	},
	serviceAccounts: {
		all: "/service_accounts",
		detail: (serviceAccountId: string) => `/service_accounts/${serviceAccountId}`,
		apiKeys: {
			all: (serviceAccountId: string) => `/service_accounts/${serviceAccountId}/api_keys`,
			detail: (serviceAccountId: string, apiKeyId: string) =>
				`/service_accounts/${serviceAccountId}/api_keys/${apiKeyId}`,
			rotate: (serviceAccountId: string, apiKeyId: string) =>
				`/service_accounts/${serviceAccountId}/api_keys/${apiKeyId}/rotate`
		}
	}
};

export function createApiPath(path: string) {
	return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}
