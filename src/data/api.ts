export const apiPaths = {
	login: "/login",
	logout: "/logout",
	currentUser: "/current-user",
	pipelines: {
		namespaces: "/pipeline_namespaces"
	},
	runs: {
		all: "/runs",
		detail: (id: string) => `/runs/${id}`,
		graph: (runId: string) => `/runs/${runId}/graph`
	}
};

export function createApiPath(path: string) {
	return `${import.meta.env.VITE_API_BASE_URL}${path}`;
}
