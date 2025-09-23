export const apiPaths = {
	login: "/login",
	activate: "/activate",
	logout: "/logout",
	currentUser: "/current-user",
	info: "/info",
	settings: "/settings",
	apiToken: "/api_token",
	onboarding: "/onboarding_state",
	pipelines: {
		all: "/pipelines",
		detail: (pipelineId: string) => `/pipelines/${pipelineId}`
	},
	artifactVersions: {
		detail: (versionId: string) => `/artifact_versions/${versionId}`,
		visualize: (versionId: string) => `/artifact_versions/${versionId}/visualize`,
		downloadToken: (versionId: string) => `/artifact_versions/${versionId}/download-token`,
		data: (versionId: string) => `/artifact_versions/${versionId}/data`
	},
	components: {
		all: "/components",
		detail: (componentId: string) => `/components/${componentId}`
	},
	devices: {
		detail: (deviceId: string) => `/devices/${deviceId}`,
		verify: (deviceId: string) => `/devices/${deviceId}/verify`
	},
	deployments: {
		list: "/deployments",
		detail: (deploymentId: string) => `/deployments/${deploymentId}`
	},
	runs: {
		all: "/runs",
		detail: (id: string) => `/runs/${id}`,
		dag: (id: string) => `/runs/${id}/dag`,
		logs: (runId: string) => `/runs/${runId}/logs`,
		refresh: (runId: string) => `/runs/${runId}/refresh`,
		stop: (runId: string) => `/runs/${runId}/stop`
	},
	pipeline_builds: {
		all: "/pipeline_builds",
		detail: (runId: string) => `/pipeline_builds/${runId}`
	},
	pipeline_snapshots: {
		list: "/pipeline_snapshots",
		detail: (snapshotId: string) => `/pipeline_snapshots/${snapshotId}`
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
		all: "/flavors",
		detail: (id: string) => `/flavors/${id}`
	},
	serviceConnectors: {
		verify: "/service_connectors/verify",
		fullStackResources: "/service_connectors/full_stack_resources",
		types: {
			all: "/service_connector_types",
			detail: (connectorType: string) => `/service_connector_types/${connectorType}`
		},
		detail: (connectorId: string) => `/service_connectors/${connectorId}`,
		list: "/service_connectors",
		verifyExisting: (connectorId: string) => `/service_connectors/${connectorId}/verify`
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
		detail: (secretId: string) => `/secrets/${secretId}`
	},
	projects: {
		statistics: (projectId: string) => `/projects/${projectId}/statistics`,
		detail: (projectId: string) => `/projects/${projectId}`
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
