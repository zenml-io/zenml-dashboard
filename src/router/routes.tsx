export const routes = {
	home: "/",
	login: "/login",
	devices: {
		verify: "/devices/verify"
	},
	models: {
		overview: "/models"
	},
	artifacts: {
		overview: "/artifacts"
	},
	pipelines: {
		overview: "/pipelines",
		namespace: (namespace: string) => `/pipelines/${namespace}`
	},
	stacks: {
		overview: "/stacks"
	},
	runs: {
		detail: (id: string) => `/runs/${id}`
	},
	settings: {
		members: `/settings/members`,
		repositories: "/settings/repositories",
		profile: `/settings/profile`,
		secrets: "/settings/secrets",
		connectors: "/settings/connectors"
	}
};
