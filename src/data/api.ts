export const apiPaths = {
	login: "/login",
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
	stacks: {
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
	}
};

export function createApiPath(path: string) {
	return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}
